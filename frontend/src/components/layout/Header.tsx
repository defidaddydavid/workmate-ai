import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Logo />

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-primary">
                Solutions
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-primary">
              Pricing
            </Link>
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-700 hover:text-primary">
                Resources
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-4 h-4">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/demo" className="hidden md:inline-block text-sm font-medium text-gray-700 hover:text-primary">
            Schedule a Demo
          </Link>
          <Link href="/signin" className="hidden md:inline-block text-sm font-medium text-gray-700 hover:text-primary">
            Log In
          </Link>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/start-for-free">Start for Free</Link>
          </Button>

          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu text-gray-700">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
