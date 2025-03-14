import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MicIcon, CalendarIcon, ClipboardListIcon, BarChart4Icon, UsersIcon, LockIcon, GlobeIcon } from 'lucide-react';

export const metadata = {
  title: 'Features - WorkMate AI',
  description: 'Discover the powerful features of WorkMate AI that revolutionize how you handle meetings, tasks, and team collaboration.',
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              WorkMate AI combines cutting-edge technology with intuitive design to transform how you handle meetings and tasks.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Advanced Meeting Transcription</h2>
                <p className="text-gray-600 mb-8">
                  WorkMate AI delivers real-time transcription with unprecedented accuracy. Never worry about missing important details again.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Real-time transcription</h3>
                      <p className="text-gray-600 text-sm">
                        Get word-for-word transcripts of your meetings as they happen, with speaker identification.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Multi-language support</h3>
                      <p className="text-gray-600 text-sm">
                        Support for over 30 languages with automatic language detection.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Searchable recordings</h3>
                      <p className="text-gray-600 text-sm">
                        Search through meeting transcripts to quickly find specific topics or discussions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl relative min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"></div>
                <div className="relative z-10 bg-white p-4 rounded-lg shadow-lg max-w-xs mx-auto mt-10">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-2">
                      W
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Strategy Meeting</h4>
                      <p className="text-xs text-gray-500">WorkMate AI</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Alex Taylor:</p>
                      <p className="text-sm text-gray-700">
                        I think we should focus on improving the user onboarding experience.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium">Jamie Williams:</p>
                      <p className="text-sm text-gray-700">
                        Good point. The analytics show a 15% drop-off during that process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-100 p-6 rounded-xl relative min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"></div>
                <div className="relative z-10 bg-white p-4 rounded-lg shadow-lg max-w-xs mx-auto mt-10">
                  <div className="border-b border-gray-200 pb-3 mb-3">
                    <h4 className="font-semibold text-sm">Meeting Follow-ups</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Design Review</p>
                        <p className="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center mr-3">
                        <ClipboardListIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Update roadmap document</p>
                        <p className="text-xs text-gray-500">Due in 2 days</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center mr-3">
                        <UsersIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Team check-in</p>
                        <p className="text-xs text-gray-500">Friday, 10:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Smart Scheduling & Follow-Ups</h2>
                <p className="text-gray-600 mb-8">
                  Automatically schedule follow-up meetings and tasks based on what was discussed, ensuring nothing falls through the cracks.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Calendar integration</h3>
                      <p className="text-gray-600 text-sm">
                        Seamlessly integrates with Google Calendar, Outlook, and other major calendar apps.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">AI-suggested follow-ups</h3>
                      <p className="text-gray-600 text-sm">
                        Get intelligent suggestions for follow-up meetings based on discussion topics.
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Reminder notifications</h3>
                      <p className="text-gray-600 text-sm">
                        Automatically send reminders for upcoming meetings and due tasks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Integrated Task Management</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Sync with your existing task management tools to keep your entire workflow organized in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ClipboardListIcon className="h-6 w-6 text-primary" />}
                title="Automatic Task Detection"
                description="WorkMate AI identifies action items from your meetings and converts them into trackable tasks."
              />

              <FeatureCard
                icon={<UsersIcon className="h-6 w-6 text-primary" />}
                title="Task Assignment"
                description="Automatically assign tasks to team members based on meeting discussions with AI assistance."
              />

              <FeatureCard
                icon={<GlobeIcon className="h-6 w-6 text-primary" />}
                title="Integration Ecosystem"
                description="Connect with Asana, Trello, Jira, Monday.com, and other popular project management tools."
              />

              <FeatureCard
                icon={<BarChart4Icon className="h-6 w-6 text-primary" />}
                title="Progress Tracking"
                description="Monitor task completion status and team productivity with intuitive dashboards."
              />

              <FeatureCard
                icon={<MicIcon className="h-6 w-6 text-primary" />}
                title="Voice Commands"
                description="Create and manage tasks using natural voice commands during meetings."
              />

              <FeatureCard
                icon={<LockIcon className="h-6 w-6 text-primary" />}
                title="Permission Controls"
                description="Set granular permissions for who can view, create, or modify tasks in your workspace."
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your meetings?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of productive teams who are already using WorkMate AI to streamline their workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/start-for-free">
                  Start for Free
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-gray-300">
                <Link href="/schedule-demo">
                  Schedule a Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
