'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExamCard from '@/components/employer/ExamCard';
import { Button } from '@/components/ui/Button';
import { Plus, Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function EmployerDashboard() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch('/api/employer/exams');
        const data = await res.json();
        if (res.ok) {
          setExams(data);
        }
      } catch (error) {
        console.error('Failed to fetch exams', error);
      } finally {
        setLoading(false);
      }
    }
    fetchExams();
  }, []);

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1440px] space-y-12">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1e293b]">Online Tests</h1>
        
        {/* Centered Search Bar */}
        <div className="flex-1 max-w-2xl mx-12">
          <div className="relative flex items-center group">
            <input
              type="text"
              placeholder="Search by exam title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-14 pl-6 pr-16 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
            <button className="absolute right-2 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-xl text-primary hover:bg-primary hover:text-white transition-all">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Link href="/employer/create-test">
          <Button className="h-14 px-8 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            Create Online Test
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100 border border-slate-200"></div>
          ))}
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              title={exam.title}
              candidates={exam.candidateCount || 'Not Set'}
              questionSets={exam.questionCount || 'Not Set'}
              slots={exam.totalSlots || 'Not Set'}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center bg-slate-50/50">
          <div className="relative mb-6 h-40 w-40">
            <Image 
              src="/empty-state.png" 
              alt="No tests" 
              fill 
              className="object-contain grayscale opacity-60"
            />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No tests created yet</h3>
          <p className="mb-10 text-slate-400 max-w-sm mx-auto">Click the button in the top right corner to create your first online assessment workflow.</p>
          <Link href="/employer/create-test">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-2xl px-12 h-14 font-bold transition-all">
              Create Your First Test
            </Button>
          </Link>
        </div>
      )}

      {/* Pagination Alignment */}
      {exams.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-10">
          <div className="flex items-center space-x-3">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 text-sm font-bold">
              1
            </div>
            <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-500">Online Test Per Page</span>
            <div className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl bg-white text-sm font-bold text-slate-800 cursor-pointer hover:border-primary transition-all">
              <span>8</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
