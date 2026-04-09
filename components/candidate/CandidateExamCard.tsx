import React from 'react';
import { Clock, FileText, XCircle } from 'lucide-react';
import Link from 'next/link';

interface CandidateExamCardProps {
  id: string;
  title: string;
  duration: number;
  questionCount: number;
  negativeMarking: number;
}

export default function CandidateExamCard({
  id,
  title,
  duration,
  questionCount,
  negativeMarking,
}: CandidateExamCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-base font-semibold text-[#1e293b] mb-5 leading-6">
        {title}
      </h3>

      <div className="flex items-center gap-6 mb-5 text-sm text-[#475569]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#94a3b8]" />
          <span>Duration:</span>
          <span className="font-semibold text-[#1e293b]">{duration} min</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#94a3b8]" />
          <span>Question:</span>
          <span className="font-semibold text-[#1e293b]">{questionCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-[#94a3b8]" />
          <span>Negative Marking:</span>
          <span className="font-semibold text-[#1e293b]">-{negativeMarking}/wrong</span>
        </div>
      </div>

      <Link href={`/candidate/exam/${id}`}>
        <button className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
          Start
        </button>
      </Link>
    </div>
  );
}
