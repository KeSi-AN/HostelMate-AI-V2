import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
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
       <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} HostelMate AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
