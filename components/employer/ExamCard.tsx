import React from 'react';
import { Users, FileText, UserCheck } from 'lucide-react';

interface ExamCardProps {
  id: string;
  title: string;
  candidates: number | string;
  questionSets: number | string;
  slots: number | string;
  onViewCandidates?: () => void;
  onEdit?: () => void;
}

import { Edit3 } from 'lucide-react';

export default function ExamCard({
  id,
  title,
  candidates,
  questionSets,
  slots,
  onViewCandidates,
  onEdit,
}: ExamCardProps) {
  const formatVal = (v: number | string) => {
    if (typeof v === 'number' && v === 0) return 'Not Set';
    if (typeof v === 'number') return v.toLocaleString();
    return v;
  };

  return (
    <div 
      className="group relative rounded-xl bg-white p-6 border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
      onClick={onEdit}
    >
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-base font-bold text-[#1e293b] leading-6 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <Edit3 className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors mt-1" />
      </div>
      
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-sm text-[#64748b]">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#94a3b8]" />
          <span>Candidates:</span>
          <span className="font-bold text-[#1e293b]">{formatVal(candidates)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#94a3b8]" />
          <span>Question Set:</span>
          <span className="font-bold text-[#1e293b]">{formatVal(questionSets)}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-[#94a3b8]" />
          <span>Exam Slots:</span>
          <span className="font-bold text-[#1e293b]">{formatVal(slots)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <button 
          onClick={(e) => { e.stopPropagation(); onViewCandidates?.(); }}
          className="flex-1 px-5 py-2.5 text-xs font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all"
        >
          View Candidates
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
          className="px-4 py-2.5 text-xs font-bold text-[#64748b] bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
        >
          Edit Test
        </button>
      </div>
    </div>
  );
}
