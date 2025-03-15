export default function SchedulingSection() {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Condense a 1-hour meeting into 30 seconds
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Attended a 1-hour team meeting, but can't remember a thing? WorkMate AI generates a 30-second summary, keeping everyone informed and helping your team stay on track.
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
                  <h3 className="font-semibold mb-1">Smart meeting summaries</h3>
                  <p className="text-gray-600 text-sm">
                    Get concise summaries that highlight the most important parts of meetings.
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
                  <h3 className="font-semibold mb-1">Calendar integration</h3>
                  <p className="text-gray-600 text-sm">
                    Seamlessly integrate with your calendar to schedule follow-up meetings.
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
                  <h3 className="font-semibold mb-1">Smart suggestions</h3>
                  <p className="text-gray-600 text-sm">
                    Receive intelligent suggestions for meeting follow-ups based on discussion topics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-2">
                    W
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Project Status Meeting</h4>
                    <p className="text-xs text-gray-500">March 12, 2025 • 10:00 AM - 11:00 AM</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-semibold text-sm mb-3">Meeting Summary</h5>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4 ml-4 list-disc">
                    <li>Team discussed Q2 goals and set priorities for the next sprint</li>
                    <li>Design team will finalize the new UI by March 18th</li>
                    <li>Engineering needs additional resources for backend development</li>
                    <li>Marketing campaign launch delayed until April 5th</li>
                  </ul>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h5 className="font-semibold text-sm mb-3">Suggested Follow-ups</h5>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </div>
                        <span className="text-sm">Schedule UI review with design team - March 18th</span>
                      </div>

                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </div>
                        <span className="text-sm">Resource allocation meeting - March 15th</span>
                      </div>

                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </div>
                        <span className="text-sm">Marketing campaign check-in - March 25th</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                  Add all to calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
