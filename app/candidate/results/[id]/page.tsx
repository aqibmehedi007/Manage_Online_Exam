'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Trophy, ArrowRight, Home } from 'lucide-react';

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/candidate/exams/${id}/result`);
        const data = await res.json();
        if (res.ok) {
          setSubmission(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Result...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-8 rounded-2xl bg-card p-12 card-shadow border border-border text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <Trophy className="h-20 w-20 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Test Completed!</h1>
          <p className="text-muted-foreground">Thank you for participating in the assessment.</p>
        </div>

        <div className="rounded-xl bg-muted/50 p-8 border border-border">
          <p className="text-sm text-muted-foreground mb-1 uppercase tracking-widest font-bold">Your Score</p>
          <p className="text-6xl font-black text-primary">{submission?.score || 0}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-border p-4">
            <p className="text-muted-foreground">Tab Switches</p>
            <p className="font-bold text-destructive">{submission?.tabSwitches || 0}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-muted-foreground">Fullscr Exits</p>
            <p className="font-bold text-destructive">{submission?.fullscreenExits || 0}</p>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <Link href="/candidate">
            <Button className="w-full h-14 rounded-xl text-lg font-bold">
              Back to Dashboard <Home className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
