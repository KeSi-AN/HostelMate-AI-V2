import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, ShieldAlert } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-20"></div>
                <h1 className="relative text-4xl md:text-6xl font-extrabold font-headline tracking-tighter text-gray-900 dark:text-gray-50">
                Find Your Perfect <span className="text-primary">Roommate</span>
                </h1>
            </div>

            <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
              Connect with compatible hostel mates in your college using AI-powered matching.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Hostel 1 - BS Boys</CardTitle>
                  <CardDescription>For 1st to 4th Year BS students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Users className="w-5 h-5 mr-2" />
                    <span><span className="font-bold text-foreground">34</span> active students looking</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/hostel1_boys/auth">
                      Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Hostel 3 - BSMS Girls</CardTitle>
                  <CardDescription>For all BSMS Girl students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Users className="w-5 h-5 mr-2" />
                    <span><span className="font-bold text-foreground">27</span> active students looking</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/hostel3_girls/auth">
                      Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
       <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-muted-foreground">
        <div className="max-w-3xl mx-auto text-sm border-t pt-8">
            <div className="flex justify-center items-center gap-2 mb-4">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground text-lg">Platform Notice</h3>
            </div>
            <p className="mb-6">
              Please use HostelMate AI responsibly. This platform is designed solely for students to find compatible roommates. Misuse of user data or services, scraping, and any form of malicious activity are strictly prohibited. We have multiple security checks and monitoring systems in place to ensure a safe and respectful community. Any violation of these terms will result in permanent account suspension.
            </p>
            <p>&copy; {new Date().getFullYear()} HostelMate AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
