import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo invert={true} />
            <p className="mt-4 text-gray-400 text-sm">
              WorkMate AI transforms meetings with real-time transcription, smart scheduling, and task management.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/business" className="text-gray-400 hover:text-white text-sm">For Business</Link></li>
              <li><Link href="/sales-teams" className="text-gray-400 hover:text-white text-sm">For Sales</Link></li>
              <li><Link href="/education" className="text-gray-400 hover:text-white text-sm">For Education</Link></li>
              <li><Link href="/media-teams" className="text-gray-400 hover:text-white text-sm">For Media</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link href="/help" className="text-gray-400 hover:text-white text-sm">Help & Support</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white text-sm">Schedule a Demo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy & Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 WorkMate AI. All rights reserved.
          </div>

          <div className="flex space-x-4">
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
