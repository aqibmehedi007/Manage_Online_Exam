'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CandidateExamCard from '@/components/candidate/CandidateExamCard';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function CandidateDashboard() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch('/api/candidate/exams');
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

  const handleStartExam = (examId: string) => {
    router.push(`/candidate/exam/${examId}`);
  };

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

        <div className="w-[180px]"></div> {/* Spacer for symmetry */}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100 border border-slate-200"></div>
          ))}
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredExams.map((exam) => (
            <CandidateExamCard
              key={exam.id}
              title={exam.title}
              duration={exam.duration}
              questions={exam.questionCount}
              negativeMarking={exam.negativeMarking}
              onStart={() => handleStartExam(exam.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[40px] border-2 border-dashed border-slate-200 p-24 text-center bg-slate-50/50">
          <div className="relative mb-6 h-40 w-40">
            <Image 
              src="/empty-state.png" 
              alt="No available tests" 
              fill 
              className="object-contain grayscale opacity-60"
            />
          </div>
          <p className="text-xl font-bold text-slate-500">No available tests at the moment.</p>
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
