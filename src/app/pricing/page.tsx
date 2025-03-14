import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Pricing - WorkMate AI',
  description: 'Choose the perfect plan for your team. WorkMate AI offers flexible pricing options to support teams of all sizes.',
};

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Pricing Plans</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Choose the perfect plan for your team. WorkMate AI offers flexible pricing options to support teams of all sizes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <p className="text-gray-600 text-sm mb-4">Perfect for individuals and small teams getting started</p>
                  <div className="flex items-end justify-center">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-500 ml-1 mb-1">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited meeting transcripts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">10 hours of recording per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic AI summaries</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Access on web and mobile</span>
                  </li>
                </ul>

                <Button asChild className="w-full" variant="outline">
                  <Link href="/start-for-free">Get Started</Link>
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary flex flex-col relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <p className="text-gray-600 text-sm mb-4">For teams that need advanced features and integrations</p>
                  <div className="flex items-end justify-center">
                    <span className="text-4xl font-bold">$15</span>
                    <span className="text-gray-500 ml-1 mb-1">/user/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Free</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited recording hours</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced AI summaries & action items</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Smart calendar scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic integrations (Slack, Calendar)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Team sharing & collaboration</span>
                  </li>
                </ul>

                <Button asChild className="w-full">
                  <Link href="/start-for-free">Try Free for 14 Days</Link>
                </Button>
              </div>

              {/* Business Plan */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">Business</h3>
                  <p className="text-gray-600 text-sm mb-4">For organizations that need advanced security and control</p>
                  <div className="flex items-end justify-center">
                    <span className="text-4xl font-bold">$30</span>
                    <span className="text-gray-500 ml-1 mb-1">/user/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full task management suite</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Premium integrations (CRM, Project Management)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Admin console & user management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">SSO & advanced security</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>

                <Button asChild className="w-full" variant="outline">
                  <Link href="/schedule-demo">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-primary/5 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Can I change my plan later?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, you can upgrade, downgrade, or cancel your plan at any time. If you downgrade or cancel, you'll maintain access to your current plan until the end of your billing cycle.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Is there a contract or commitment?</h3>
                  <p className="text-gray-600 text-sm">
                    No, all plans are billed monthly or annually with no long-term contracts. You can cancel at any time.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Do you offer discounts for annual billing?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, you can save 20% by choosing annual billing on any of our paid plans.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Do you offer special pricing for non-profits or educational institutions?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we offer special discounts for qualifying non-profit organizations and educational institutions. Please contact our sales team for more information.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Still have questions? We're here to help.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
