import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TranscriptionStatus {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  message?: string;
  transcript?: string;
  analysis?: {
    summary: string;
    key_points: string[];
    action_items: string[];
  };
}

export default function MeetingTranscriber({ meetingId }: { meetingId: string }) {
  const [status, setStatus] = useState<TranscriptionStatus>({ status: 'idle' });
  const [isLive, setIsLive] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'premium' | 'enterprise'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // File upload handling
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setStatus({ status: 'uploading' });

      const formData = new FormData();
      formData.append('audio_file', file);
      formData.append('tier', selectedTier);

      const response = await fetch(`/api/v1/transcription/upload/${meetingId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      setStatus({ status: 'processing' });
      pollTranscriptionStatus();
    } catch (error) {
      setStatus({ status: 'error', message: 'Failed to upload file' });
    }
  };

  // Status polling
  const pollTranscriptionStatus = async () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/v1/transcription/${meetingId}/status`);
        const data = await response.json();

        if (data.status === 'completed') {
          clearInterval(interval);
          const [transcriptRes, analysisRes] = await Promise.all([
            fetch(`/api/v1/transcription/${meetingId}/transcript`),
            fetch(`/api/v1/transcription/${meetingId}/analysis`)
          ]);

          const [transcript, analysis] = await Promise.all([
            transcriptRes.json(),
            analysisRes.json()
          ]);

          setStatus({
            status: 'completed',
            transcript: transcript.text,
            analysis: analysis
          });
        } else if (data.status === 'error') {
          clearInterval(interval);
          setStatus({ status: 'error', message: data.error_message });
        }
      } catch (error) {
        clearInterval(interval);
        setStatus({ status: 'error', message: 'Failed to get status' });
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  // Live transcription
  const startLiveTranscription = () => {
    if (selectedTier !== 'enterprise') {
      setStatus({ status: 'error', message: 'Live transcription requires Enterprise tier' });
      return;
    }

    const ws = new WebSocket(
      `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/v1/transcription/live/${meetingId}?tier=enterprise`
    );

    ws.onopen = () => {
      setIsLive(true);
      setStatus({ status: 'processing', message: 'Live transcription active' });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(prev => ({
        ...prev,
        transcript: (prev.transcript || '') + '\n' + data.chunk_text
      }));
    };

    ws.onerror = () => {
      setStatus({ status: 'error', message: 'Live transcription error' });
      setIsLive(false);
    };

    ws.onclose = () => {
      setIsLive(false);
    };

    wsRef.current = ws;
  };

  const stopLiveTranscription = () => {
    wsRef.current?.close();
    setIsLive(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Meeting Transcription</h3>
        <div className="flex gap-2 mb-4">
          {(['basic', 'premium', 'enterprise'] as const).map((tier) => (
            <Button
              key={tier}
              variant={selectedTier === tier ? 'default' : 'outline'}
              onClick={() => setSelectedTier(tier)}
              className="capitalize"
            >
              {tier}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".mp3,.wav,.m4a"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={status.status === 'processing' || isLive}
          >
            Upload Audio File
          </Button>
        </div>

        {/* Live Transcription */}
        {selectedTier === 'enterprise' && (
          <div>
            <Button
              onClick={isLive ? stopLiveTranscription : startLiveTranscription}
              variant={isLive ? 'destructive' : 'default'}
              disabled={status.status === 'processing' && !isLive}
            >
              {isLive ? 'Stop Live Transcription' : 'Start Live Transcription'}
            </Button>
          </div>
        )}

        {/* Status and Results */}
        <div className="mt-4">
          {status.status !== 'idle' && (
            <div className="space-y-4">
              <div className="text-sm font-medium">
                Status: <span className="capitalize">{status.status}</span>
                {status.message && (
                  <span className="text-gray-500 ml-2">{status.message}</span>
                )}
              </div>

              {status.transcript && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Transcript:</h4>
                  <p className="whitespace-pre-wrap text-sm">{status.transcript}</p>
                </div>
              )}

              {status.analysis && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Summary:</h4>
                    <p className="text-sm">{status.analysis.summary}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Points:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {status.analysis.key_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Action Items:</h4>
                    <ul className="list-disc list-inside text-sm">
                      {status.analysis.action_items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
