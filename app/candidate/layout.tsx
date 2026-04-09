import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session ? await prisma.user.findUnique({ where: { id: session.id } }) : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar userEmail={session?.email} userName={user?.name || undefined} />
      <main className="flex-1 flex flex-col pt-4">
        <div className="flex-1 px-8 pb-12">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
