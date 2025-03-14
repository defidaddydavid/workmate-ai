export default function TaskSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Skip the tedious task of composing action item emails
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            WorkMate AI automatically captures and assigns action items from meetings, with complete context of the discussion, keeping everyone aligned on next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Assigns action items</h3>
            <p className="text-gray-600 mb-4">
              WorkMate AI automatically identifies and assigns action items to teammates, saving the meeting leader time while keeping the team aligned on next steps.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div className="text-sm text-gray-800">
                  <span className="font-medium">Redesign homepage</span>
                  <span className="text-xs text-gray-500 ml-2">Assigned to Sarah</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="text-sm text-gray-800">
                  <span className="font-medium">Fix login bug</span>
                  <span className="text-xs text-gray-500 ml-2">Assigned to James</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Posts to integrations</h3>
            <p className="text-gray-600 mb-4">
              WorkMate AI automatically shares meeting notes and summaries with teammates via email and in the team's communication channels like Slack.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/>
                    <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/>
                    <path d="M15 2v5h5"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Meeting notes shared in #team-project</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Action items emailed to all participants</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                <line x1="6" y1="16" x2="6.01" y2="16"/>
                <line x1="10" y1="16" x2="10.01" y2="16"/>
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Integrates with your workflow</h3>
            <p className="text-gray-600 mb-4">
              WorkMate AI integrates with tools your team uses everyday, including all major task management systems, CRMs, and productivity suites.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2684FF]">
                  <path d="m5 8 6 6 6-6"/>
                  <path d="M5 16h12"/>
                </svg>
              </div>
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#24AB63]">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0066FF]">
                  <path d="M20.9 18.55A9 9 0 1 0 12 21a9.26 9.26 0 0 0 7.75-4.31"/>
                  <path d="M14 2v2.7"/>
                  <path d="M20.1 6.5a6.8 6.8 0 0 0-1 1.1"/>
                  <path d="M15.5 12c.7.7 1.2.7 2 .9"/>
                  <path d="M5 19.5V7a2 2 0 0 1 2-2h7"/>
                  <path d="M9 11h6"/>
                  <path d="M9 14h2"/>
                </svg>
              </div>
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E43525]">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="8 12 12 16 16 12"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                </svg>
              </div>
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5156BE]">
                  <rect width="6" height="14" x="4" y="5" rx="2"/>
                  <rect width="6" height="10" x="14" y="7" rx="2"/>
                  <path d="M17 22v-5"/>
                  <path d="M7 22v-3"/>
                  <path d="M17 7V2"/>
                  <path d="M7 5V2"/>
                </svg>
              </div>
              <div className="bg-gray-50 h-12 rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0078D4]">
                  <path d="M13 18H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/>
                  <polyline points="15 14 13 16 15 18"/>
                  <line x1="13" y1="16" x2="21" y2="16"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
