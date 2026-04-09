import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
  return (
    <div className="group rounded-[32px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(124,58,237,0.08)] transition-all duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-8 line-clamp-2 min-h-[3.5rem] leading-8 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <Users className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Candidates</span>
            <span className="text-sm font-bold text-slate-700">{typeof candidates === 'number' ? candidates.toLocaleString() : candidates}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Question Set</span>
            <span className="text-sm font-bold text-slate-700">{questionSets}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 border-l border-slate-100 pl-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Exam Slots</span>
            <span className="text-sm font-bold text-slate-700">{slots}</span>
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={onViewCandidates}
        className="w-full h-14 rounded-2xl text-primary border-primary/30 hover:bg-primary/5 hover:border-primary font-bold text-base transition-all active:scale-[0.98]"
      >
        View Candidates
      </Button>
    </div>
  );
}
