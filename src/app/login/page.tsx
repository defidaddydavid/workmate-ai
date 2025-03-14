import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Login - WorkMate AI',
  description: 'Log in to your WorkMate AI account to access your meetings, transcriptions, and team productivity tools.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Login to WorkMate AI</h1>
            <p className="text-gray-600">
              Access your meetings, transcriptions, and team productivity tools.
            </p>
          </div>

          <Card className="p-6 bg-white shadow-sm">
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                Login
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="py-2 px-4">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="py-2 px-4">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M12.0009 2C6.47793 2 2.00091 6.47702 2.00091 12C2.00091 16.4217 4.87193 20.1661 8.83916 21.4892C9.33897 21.5822 9.52175 21.2733 9.52175 21.0062C9.52175 20.7682 9.51262 20.0308 9.5079 19.2653C6.72636 19.9081 6.13965 17.9687 6.13965 17.9687C5.68479 16.8111 5.02707 16.5028 5.02707 16.5028C4.12118 15.8263 5.09271 15.8392 5.09271 15.8392C6.09234 15.9119 6.62453 16.9313 6.62453 16.9313C7.52298 18.4834 8.97013 18.0166 9.53988 17.7573C9.63066 17.1119 9.88427 16.6451 10.1671 16.4213C7.95799 16.1941 5.6196 15.3426 5.6196 11.4739C5.6196 10.3668 6.00983 9.46095 6.64942 8.75548C6.54337 8.49947 6.20276 7.49654 6.74714 6.12632C6.74714 6.12632 7.58625 5.85489 9.49684 7.1412C10.2953 6.9075 11.1527 6.79205 12.0009 6.78763C12.849 6.79205 13.7072 6.9075 14.5074 7.1412C16.4154 5.85489 17.2528 6.12632 17.2528 6.12632C17.799 7.49654 17.4583 8.49947 17.3523 8.75548C17.9937 9.46095 18.3803 10.3668 18.3803 11.4739C18.3803 15.353 16.0375 16.1908 13.8213 16.4127C14.1716 16.6918 14.4782 17.2417 14.4782 18.0741C14.4782 19.2698 14.4654 20.6777 14.4654 21.0062C14.4654 21.2757 14.6447 21.5877 15.1526 21.4883C19.1317 20.1635 22 16.4198 22 12C22 6.47702 17.523 2 12.0009 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By logging in, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
