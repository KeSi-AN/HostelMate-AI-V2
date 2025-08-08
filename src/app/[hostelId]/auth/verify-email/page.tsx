
import { Logo } from '@/components/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-xl text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-8 w-8" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to your college email address. Please click the link in the email to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once you've verified, you can close this tab and log in. Didn't receive an email? Check your spam folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
