import Image from 'next/image';

export default function TranscriptionSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-white p-4 rounded-xl">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-2">
                      W
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Product Launch Meeting</h4>
                      <p className="text-xs text-gray-500">WorkMate AI</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm font-medium">Sarah Johnson:</p>
                      <p className="text-sm text-gray-700">
                        The new feature launch is set for June 1st. We need to prepare the marketing materials by next week.
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm font-medium">Michael Chen:</p>
                      <p className="text-sm text-gray-700">
                        I'll create the product demo video by Friday. We should also update the website with the new feature information.
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <p className="text-sm font-medium">WorkMate AI:</p>
                      <p className="text-sm text-gray-700 font-medium">
                        Meeting Summary:
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1 mt-1 ml-4 list-disc">
                        <li>Product launch scheduled for June 1st</li>
                        <li>Marketing materials due next week</li>
                        <li>Michael to create product demo video by Friday</li>
                        <li>Website needs to be updated with new feature info</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">
              Never miss a detail with AI Meeting notes
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              WorkMate AI auto-joins your video conferencing platforms like Zoom, Google Meet, and Microsoft Teams to automatically take notes, allowing everyone to participate freely in the discussion.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time transcription</h3>
                  <p className="text-gray-600 text-sm">
                    Get word-for-word transcripts of your meetings as they happen.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI-generated summaries</h3>
                  <p className="text-gray-600 text-sm">
                    Get concise summaries that capture the key points of every meeting.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Automated action items</h3>
                  <p className="text-gray-600 text-sm">
                    Automatically extract action items and assign them to meeting participants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
