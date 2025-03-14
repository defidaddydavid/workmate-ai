import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-primary/10 text-primary font-medium text-sm px-4 py-1 rounded-full mb-8">NEW! WorkMate AI for Teams</div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            The #1 AI Meeting Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
            Never take meeting notes again. Get transcripts, automated summaries, action items, and chat with WorkMate to get answers from your meetings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/start-for-free">
                Start for Free
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-300">
              <Link href="/watch-demo">
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Meeting Transcription</h3>
            <p className="text-gray-600 text-sm">
              Get automated meeting notes and summaries with action items using WorkMate AI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Scheduling</h3>
            <p className="text-gray-600 text-sm">
              Schedule follow-up meetings and tasks based on meeting content using smart AI features.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                <path d="m15 5 3 3" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Task Management</h3>
            <p className="text-gray-600 text-sm">
              Sync with existing task managers to help you and your team stay on top of work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
