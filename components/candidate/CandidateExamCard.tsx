import React from 'react';
import { Clock, BookOpen, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CandidateExamCardProps {
  title: string;
  duration: number;
  questions: number;
  negativeMarking: number;
  onStart: () => void;
  status?: string;
}

export default function CandidateExamCard({
  title,
  duration,
  questions,
  negativeMarking,
  onStart,
  status,
}: CandidateExamCardProps) {
  return (
    <div className="group rounded-[32px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(124,58,237,0.08)] transition-all duration-300">
      <h3 className="text-xl font-bold text-slate-800 mb-8 line-clamp-2 min-h-[3.5rem] leading-8 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      <div className="grid grid-cols-3 gap-2 mb-10">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duration:</span>
            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{duration} min</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Question:</span>
            <span className="text-sm font-bold text-slate-700">{questions}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
            <XCircle className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Negative Marking:</span>
            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">-{negativeMarking}/wrong</span>
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        onClick={onStart}
        className="w-full h-14 rounded-2xl text-primary border-primary/30 hover:bg-primary/5 hover:border-primary font-bold text-base transition-all active:scale-[0.98]"
      >
        Start
      </Button>
    </div>
  );
}
