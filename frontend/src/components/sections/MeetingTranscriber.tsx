'use client';

import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface TranscriptionData {
  transcript: string;
  summary?: string;
  actionItems?: string[];
}

interface MeetingTranscriberProps {
  meetingId: string;
  onTranscriptionComplete?: (data: TranscriptionData) => void;
}

export function MeetingTranscriber({ meetingId, onTranscriptionComplete }: MeetingTranscriberProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  // WebSocket connection for live transcription
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${API_BASE_URL.replace('http', 'ws')}/api/v1/transcription/live/${meetingId}`,
    {
      shouldReconnect: () => false,
      onOpen: () => console.log('WebSocket Connected'),
      onError: (error) => {
        console.error('WebSocket Error:', error);
        setError('Failed to connect to live transcription service');
      },
    }
  );

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.transcript) {
          setTranscript((prev) => prev + ' ' + data.transcript);
          if (onTranscriptionComplete) {
            onTranscriptionComplete({
              transcript: data.transcript,
              summary: data.summary,
              actionItems: data.actionItems,
            });
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        setError('Error receiving transcription data');
      }
    }
  }, [lastMessage, onTranscriptionComplete]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!audioFile) {
      setError('Please select an audio file to upload');
      return;
    }

    setIsProcessing(true);
    setError('');

    const formData = new FormData();
    formData.append('audioFile', audioFile);
    formData.append('meetingId', meetingId);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/transcription/upload/${meetingId}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to upload audio file');
      }

      const data = await response.json();
      setTranscript(data.transcript);
      
      if (onTranscriptionComplete) {
        onTranscriptionComplete({
          transcript: data.transcript,
          summary: data.summary,
          actionItems: data.actionItems,
        });
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      setError('Failed to upload and transcribe audio file');
    } finally {
      setIsProcessing(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
        setAudioFile(file);
        await handleUpload();
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setError('');

      // Stop recording after 30 minutes
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
          setIsRecording(false);
        }
      }, 30 * 60 * 1000);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // The actual stop logic is handled in the mediaRecorder.onstop event
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div>
        <h2 className="text-2xl font-bold mb-4">Meeting Transcriber</h2>
        <p className="text-gray-600 mb-4">
          Upload an audio file or start recording to transcribe your meeting.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="audio-file" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Audio File
          </label>
          <input
            id="audio-file"
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            disabled={isProcessing || isRecording}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleUpload}
            disabled={!audioFile || isProcessing || isRecording}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            className={`flex-1 px-4 py-2 rounded-md ${
              isRecording
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>

        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-50 rounded-md">
            {error}
          </div>
        )}
      </div>

      {transcript && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Transcript</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-wrap">{transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
}
