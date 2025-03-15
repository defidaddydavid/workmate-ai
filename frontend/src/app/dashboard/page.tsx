import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Dashboard - WorkMate AI',
  description: 'WorkMate AI Dashboard - Manage your meetings, transcriptions, and team tasks in one place.',
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome to your WorkMate AI dashboard. Manage your meetings, transcriptions, and team tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                  <path d="M5 22h14" />
                  <path d="M5 2h14" />
                  <rect width="14" height="16" x="5" y="4" rx="2" />
                  <path d="M10 4v16" />
                </svg>
                Recent Meetings
              </h2>
              <p className="text-sm text-gray-500 mb-4">Your most recent transcribed meetings.</p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Weekly Team Standup</h3>
                  <p className="text-sm text-gray-600">March 10, 2025 • 30 minutes</p>
                  <div className="flex mt-2">
                    <Button variant="link" className="h-auto p-0 text-primary">View Details</Button>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Product Strategy Session</h3>
                  <p className="text-sm text-gray-600">March 12, 2025 • 60 minutes</p>
                  <div className="flex mt-2">
                    <Button variant="link" className="h-auto p-0 text-primary">View Details</Button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Meetings</Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                  <path d="M12 2v4" />
                  <path d="M20 12h-4" />
                  <path d="M12 18v4" />
                  <path d="M4 12h4" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                Action Items
              </h2>
              <p className="text-sm text-gray-500 mb-4">Tasks and action items from your meetings.</p>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Michael to resolve data formatting issue</h3>
                  <p className="text-sm text-gray-600">Due: March 17, 2025</p>
                  <p className="text-xs text-gray-500 mt-1">From: Weekly Team Standup</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Create detailed spec for collaboration features</h3>
                  <p className="text-sm text-gray-600">Due: March 19, 2025</p>
                  <p className="text-xs text-gray-500 mt-1">From: Product Strategy Session</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Jamie to share onboarding flow mockups</h3>
                  <p className="text-sm text-gray-600">Due: March 13, 2025</p>
                  <p className="text-xs text-gray-500 mt-1">From: Weekly Team Standup</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View All Action Items</Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Team Members
              </h2>
              <p className="text-sm text-gray-500 mb-4">Your team and recent collaborators.</p>
              <div className="space-y-3">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium mr-3">SJ</div>
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-xs text-gray-600">Product Manager</p>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium mr-3">MC</div>
                  <div>
                    <h3 className="font-medium">Michael Chen</h3>
                    <p className="text-xs text-gray-600">Senior Developer</p>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium mr-3">AR</div>
                  <div>
                    <h3 className="font-medium">Alex Rodriguez</h3>
                    <p className="text-xs text-gray-600">UX Researcher</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">View Team Directory</Button>
              </div>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
              <Button className="bg-primary">Schedule Meeting</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left text-sm font-medium text-gray-600">Meeting</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">Date & Time</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">Participants</th>
                    <th className="py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">
                      <div className="font-medium">Q2 Planning</div>
                      <div className="text-sm text-gray-500">30 minutes</div>
                    </td>
                    <td className="py-4">
                      <div>March 15, 2025</div>
                      <div className="text-sm text-gray-500">10:00 AM</div>
                    </td>
                    <td className="py-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">SJ</div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">MC</div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">AR</div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs ring-2 ring-white">+2</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Join</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">
                      <div className="font-medium">Design Review</div>
                      <div className="text-sm text-gray-500">45 minutes</div>
                    </td>
                    <td className="py-4">
                      <div>March 16, 2025</div>
                      <div className="text-sm text-gray-500">2:00 PM</div>
                    </td>
                    <td className="py-4">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">JT</div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">AR</div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs ring-2 ring-white">SJ</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Join</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Meeting Analytics</h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Analytics graph placeholder</p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-gray-500">Meetings this month</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">28</div>
                  <div className="text-xs text-gray-500">Action items created</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary">75%</div>
                  <div className="text-xs text-gray-500">Completion rate</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 pb-4">
                  <div className="text-sm font-medium">New meeting transcription available</div>
                  <div className="text-xs text-gray-500">Product Strategy Session • 2 hours ago</div>
                </div>
                <div className="border-l-2 border-gray-300 pl-4 pb-4">
                  <div className="text-sm font-medium">Alex Rodriguez completed an action item</div>
                  <div className="text-xs text-gray-500">Present user research findings • 5 hours ago</div>
                </div>
                <div className="border-l-2 border-gray-300 pl-4 pb-4">
                  <div className="text-sm font-medium">New meeting scheduled</div>
                  <div className="text-xs text-gray-500">Q2 Planning • 1 day ago</div>
                </div>
                <div className="border-l-2 border-gray-300 pl-4 pb-4">
                  <div className="text-sm font-medium">Weekly Team Standup transcription available</div>
                  <div className="text-xs text-gray-500">Weekly Team Standup • 2 days ago</div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="link" className="p-0 h-auto text-primary">View All Activity</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
