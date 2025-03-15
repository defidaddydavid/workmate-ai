'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import { MeetingTranscriber } from '@/components/sections/MeetingTranscriber';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface TranscriptionData {
  id: string;
  status: 'processing' | 'completed' | 'error';
  text?: string;
  error?: string;
  analysis?: {
    summary: string;
    key_points: string[];
    action_items: string[];
  };
}

export const metadata = {
  title: 'Meeting Details - WorkMate AI',
  description: 'View and manage your meeting details, transcriptions, and action items.',
};

export default function MeetingPage() {
  const params = useParams();
  const meetingId = params.id as string;
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData | null>(null);

  const handleTranscriptionComplete = (data: TranscriptionData) => {
    setTranscriptionData(data);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Meeting Details</h1>
              <p className="text-gray-600">
                View and manage meeting transcription, summaries, and action items.
              </p>
            </div>
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Meeting Info */}
            <Card className="p-6 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Meeting Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span>In Progress</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <div className="mt-1">March 15, 2025 10:00 AM</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Duration</label>
                  <div className="mt-1">60 minutes</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Participants</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2">
                        SJ
                      </div>
                      <span className="text-sm">Sarah Johnson</span>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2">
                        MC
                      </div>
                      <span className="text-sm">Michael Chen</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Transcription Section */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div>Loading transcription...</div>}>
                <div className="container mx-auto px-4 py-8">
                  <h1 className="text-2xl font-bold mb-6">Meeting Transcription</h1>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <MeetingTranscriber 
                        meetingId={meetingId}
                        tier="enterprise"
                        onTranscriptionComplete={handleTranscriptionComplete}
                      />
                    </div>

                    {transcriptionData && transcriptionData.status === 'completed' && (
                      <div className="space-y-6">
                        {transcriptionData.text && (
                          <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Transcript</h2>
                            <p className="whitespace-pre-wrap text-gray-700">{transcriptionData.text}</p>
                          </div>
                        )}

                        {transcriptionData.analysis && (
                          <>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                              <h2 className="text-xl font-semibold mb-4">Summary</h2>
                              <p className="text-gray-700">{transcriptionData.analysis.summary}</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                              <h2 className="text-xl font-semibold mb-4">Key Points</h2>
                              <ul className="list-disc list-inside space-y-2">
                                {transcriptionData.analysis.key_points.map((point, index) => (
                                  <li key={index} className="text-gray-700">{point}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm">
                              <h2 className="text-xl font-semibold mb-4">Action Items</h2>
                              <ul className="list-disc list-inside space-y-2">
                                {transcriptionData.analysis.action_items.map((item, index) => (
                                  <li key={index} className="text-gray-700">{item}</li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
