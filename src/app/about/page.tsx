import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About Us - WorkMate AI',
  description: 'Learn about the team behind WorkMate AI and our mission to transform how teams collaborate through AI-powered meeting and task management.',
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WorkMate AI</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              We're on a mission to transform the way teams work together, making meetings more productive and follow-ups more effective.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  WorkMate AI was founded in 2023 by a team of AI experts and productivity enthusiasts who were frustrated with inefficient meetings and lost action items.
                </p>
                <p className="text-gray-600 mb-4">
                  We recognized that despite advances in technology, meetings were still a major source of wasted time and lost information in businesses worldwide. So we set out to solve this problem using the latest advancements in artificial intelligence.
                </p>
                <p className="text-gray-600">
                  Today, WorkMate AI helps thousands of teams across the globe transform their meetings from time-consuming obligations into productive collaboration sessions with clear outcomes and automated follow-ups.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-xl">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      W
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">WorkMate AI</h3>
                      <p className="text-sm text-gray-500">Founded in 2023</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <p>Launched beta product in January 2023</p>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <p>Secured $5M seed funding in April 2023</p>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <p>Released full product in September 2023</p>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <p>Surpassed 1,000 corporate customers in early 2024</p>
                    </div>

                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                      <p>Growing team with offices in San Francisco and London</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to transforming workplace collaboration through intelligent technology that enhances human potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovation First</h3>
                <p className="text-gray-600 text-sm">
                  We pursue groundbreaking solutions that push the boundaries of what AI can do for workplace productivity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">People-Centered</h3>
                <p className="text-gray-600 text-sm">
                  We design our tools to enhance human collaboration, not replace it, creating technology that adapts to how people naturally work.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 6V4c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path>
                    <path d="M14 16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Impactful Simplicity</h3>
                <p className="text-gray-600 text-sm">
                  We believe in creating simple solutions to complex problems, focusing on tools that deliver real impact without adding complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Meet the experienced team driving our mission forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-100 p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                <p className="text-primary font-medium text-sm mb-3">CEO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  Previously led AI product teams at Google and has a PhD in Machine Learning from Stanford.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Michael Chen</h3>
                <p className="text-primary font-medium text-sm mb-3">CTO & Co-Founder</p>
                <p className="text-gray-600 text-sm">
                  Former lead architect at Microsoft with over 15 years of experience in building scalable AI systems.
                </p>
              </div>

              <div className="bg-gray-100 p-6 rounded-xl text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold text-lg">Alex Rodriguez</h3>
                <p className="text-primary font-medium text-sm mb-3">COO</p>
                <p className="text-gray-600 text-sm">
                  Experienced operations leader who has scaled multiple startups from early stage to successful exits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary/5">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who are passionate about using AI to transform how people work. Check out our open positions.
            </p>

            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/careers">
                View Open Positions
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
