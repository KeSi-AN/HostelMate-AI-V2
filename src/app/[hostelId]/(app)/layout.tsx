import { Header } from "@/components/dashboard/header";

export default function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { hostelId: string };
}) {
  const hostelName = params.hostelId === 'hostel1_boys' ? 'Hostel 1 - BS Boys' : 'Hostel 3 - BSMS Girls';
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header hostelName={hostelName} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
