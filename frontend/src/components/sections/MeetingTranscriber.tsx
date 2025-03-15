'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import useWebSocket from 'react-use-websocket';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface TranscriptionResponse {
  id: string;
  status: 'processing' | 'completed' | 'error';
  text?: string;
  error?: string;
}

interface Props {
  meetingId: string;
  tier?: 'basic' | 'premium' | 'enterprise';
  onTranscriptionComplete?: (transcription: TranscriptionResponse) => void;
}

export const MeetingTranscriber: React.FC<Props> = ({
  meetingId,
  tier = 'basic',
  onTranscriptionComplete
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [liveTranscript, setLiveTranscript] = useState<string>('');

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const router = useRouter();

  const wsUrl = tier === 'enterprise' 
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace('http', 'ws') || 'ws://localhost:8000'}/api/v1/transcription/live/${meetingId}?tier=enterprise`
    : null;

  const { sendMessage, lastMessage } = useWebSocket(wsUrl || null, {
    shouldReconnect: () => tier === 'enterprise',
    reconnectInterval: 3000,
  });

  React.useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.text) {
          setLiveTranscript(prev => prev + ' ' + data.text);
        }
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    }
  }, [lastMessage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
          if (tier === 'enterprise') {
            sendMessage(event.data);
          }
        }
      };

      mediaRecorder.current.onstop = async () => {
        if (tier !== 'enterprise') {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
          await uploadAudioFile(audioBlob);
        }
        audioChunks.current = [];
      };

      mediaRecorder.current.start(1000); // Collect data every second
      setIsRecording(true);
      setError('');
    } catch (err) {
      setError('Failed to access microphone. Please check permissions.');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const uploadAudioFile = async (audioBlob: Blob) => {
    const formData = new FormData();
    const fileName = `recording-${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}.webm`;
    formData.append('audioFile', audioBlob, fileName);
    formData.append('meetingId', meetingId);
    formData.append('tier', tier);

    try {
      const response = await fetch('/api/transcription', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setTranscriptionStatus('Processing transcription...');
      pollTranscriptionStatus(data.id);
    } catch (err) {
      setError('Failed to upload audio file.');
      console.error('Upload error:', err);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('audioFile', selectedFile);
    formData.append('meetingId', meetingId);
    formData.append('tier', tier);

    try {
      setUploadProgress(0);
      const response = await fetch('/api/transcription', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setTranscriptionStatus('Processing transcription...');
      pollTranscriptionStatus(data.id);
    } catch (err) {
      setError('Failed to upload audio file.');
      console.error('Upload error:', err);
    }
  };

  const pollTranscriptionStatus = async (transcriptionId: string) => {
    try {
      const response = await fetch(`/api/transcription?meetingId=${meetingId}&type=status`);
      const data = await response.json();

      if (data.status === 'completed') {
        setTranscriptionStatus('Transcription completed');
        onTranscriptionComplete?.(data);
      } else if (data.status === 'error') {
        setError(data.error || 'Transcription failed');
      } else {
        setTimeout(() => pollTranscriptionStatus(transcriptionId), 5000);
      }
    } catch (err) {
      setError('Failed to check transcription status');
      console.error('Status check error:', err);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold">Meeting Transcription</h3>
        {tier === 'enterprise' && (
          <span className="text-sm text-blue-600">Enterprise Live Transcription Enabled</span>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        {/* Recording Controls */}
        <div className="flex space-x-2">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Stop Recording
            </button>
          )}
        </div>

        {/* File Upload */}
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="border p-2 rounded-md"
          />
          {selectedFile && (
            <button
              onClick={handleFileUpload}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Upload File
            </button>
          )}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Status and Error Messages */}
        {transcriptionStatus && (
          <div className="text-sm text-gray-600">{transcriptionStatus}</div>
        )}
        {error && (
          <div className="text-sm text-red-600">{error}</div>
        )}

        {/* Live Transcript Display */}
        {tier === 'enterprise' && liveTranscript && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-semibold mb-2">Live Transcript</h4>
            <p className="text-sm text-gray-700">{liveTranscript}</p>
          </div>
        )}
      </div>
    </div>
  );
};
