import React from 'react';
import { Users, FileText, UserCheck } from 'lucide-react';

interface ExamCardProps {
  title: string;
  candidates: number | string;
  questionSets: number | string;
  slots: number | string;
  onViewCandidates?: () => void;
}

export default function ExamCard({
  title,
  candidates,
  questionSets,
  slots,
  onViewCandidates,
}: ExamCardProps) {
  const formatVal = (v: number | string) => {
    if (typeof v === 'number' && v === 0) return 'Not Set';
    if (typeof v === 'number') return v.toLocaleString();
    return v;
  };

  return (
    <div className="rounded-xl bg-white p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-base font-semibold text-[#1e293b] mb-5 leading-6">
        {title}
      </h3>
      
      <div className="flex items-center gap-6 mb-5 text-sm text-[#475569]">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#94a3b8]" />
          <span>Candidates:</span>
          <span className="font-semibold text-[#1e293b]">{formatVal(candidates)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#94a3b8]" />
          <span>Question Set:</span>
          <span className="font-semibold text-[#1e293b]">{formatVal(questionSets)}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-[#94a3b8]" />
          <span>Exam Slots:</span>
          <span className="font-semibold text-[#1e293b]">{formatVal(slots)}</span>
        </div>
      </div>

      <button 
        onClick={onViewCandidates}
        className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
      >
        View Candidates
      </button>
    </div>
  );
}
