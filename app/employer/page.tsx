'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExamCard from '@/components/employer/ExamCard';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export default function EmployerDashboard() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await fetch('/api/employer/exams');
        const data = await res.json();
        if (res.ok) setExams(data);
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
    <div className="mx-auto max-w-[1280px] space-y-8">
      {/* Header: Title + Search + Create */}
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-xl font-bold text-[#1e293b] whitespace-nowrap">Online Tests</h1>

        <div className="flex-1 max-w-lg">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by exam title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-5 pr-12 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
            <button className="absolute right-3 text-primary">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Link href="/employer/create-test">
          <button className="h-12 px-6 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors whitespace-nowrap">
            Create Online Test
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100 border border-gray-200"></div>
          ))}
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              candidates={exam.totalCandidates || 0}
              questionSets={exam.questionCount || 0}
              slots={exam.totalSlots || 0}
              onViewCandidates={() => window.location.href = '/employer/candidates'}
              onEdit={() => window.location.href = `/employer/exams/${exam.id}/edit`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-16 text-center">
          <div className="relative mb-4 h-24 w-24">
            <Image
              src="/empty-state.png"
              alt="No tests"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-[#1e293b] mb-2">No Online Test Available</h3>
          <p className="text-sm text-gray-500 max-w-md">Currently, there are no online tests available. Please check back later for updates.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredExams.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 flex items-center justify-center rounded border border-gray-200 text-sm font-medium text-[#1e293b]">
              1
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Online Test Per Page</span>
            <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded text-sm font-medium text-[#1e293b] cursor-pointer hover:border-primary transition-colors">
              <span>8</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
