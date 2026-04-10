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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

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

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExams.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
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
      ) : currentItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentItems.map((exam) => (
            <ExamCard
              key={exam.id}
              id={exam.id}
              title={exam.title}
              candidates={exam.candidateCount || 0}
              questionSets={exam.questionCount || 0}
              slots={exam.totalSlots || 0}
              onViewCandidates={() => window.location.href = `/employer/exams/${exam.id}/candidates`}
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
              sizes="96px"
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
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`h-8 w-8 flex items-center justify-center rounded border border-gray-200 transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-gray-400 hover:text-primary hover:border-primary'}`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 flex items-center justify-center rounded border border-primary bg-primary/5 text-sm font-bold text-primary">
              {currentPage}
            </div>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`h-8 w-8 flex items-center justify-center rounded border border-gray-200 transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-gray-400 hover:text-primary hover:border-primary'}`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-400 ml-2">Page {currentPage} of {totalPages}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Online Test Per Page</span>
            <div className="relative group">
              <div className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded text-sm font-medium text-[#1e293b] cursor-pointer hover:border-primary transition-colors bg-white">
                <span>{itemsPerPage}</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </div>
              
              <div className="absolute bottom-full mb-1 right-0 hidden group-hover:block w-20 bg-white border border-gray-100 rounded-lg shadow-xl py-1 z-10 overflow-hidden">
                {[4, 8, 12, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                        setItemsPerPage(num);
                        setCurrentPage(1);
                    }}
                    className={`block w-full text-left px-4 py-2 text-xs font-bold hover:bg-gray-50 ${itemsPerPage === num ? 'text-primary bg-primary/5' : 'text-gray-500'}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
