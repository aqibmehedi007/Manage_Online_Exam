'use client';

import React, { useState } from 'react';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import QuestionModal from './QuestionModal';

export default function QuestionsForm() {
  const { questions, removeQuestion, setStep, basicInfo, reset } = useCreateExamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSaveExam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/employer/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...basicInfo,
          questions,
        }),
      });

      if (res.ok) {
        reset();
        router.push('/employer');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save exam');
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center p-20 min-h-[300px] rounded-xl border-2 border-dashed border-border bg-muted/5">
        {questions.length === 0 ? (
          <div className="text-center">
            <Button 
              onClick={() => {
                setCurrentQuestionId(null);
                setIsModalOpen(true);
              }}
              className="px-20 py-8 h-auto rounded-xl text-lg font-bold bg-primary hover:bg-primary/90"
            >
              Add Question
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <p className="font-semibold line-clamp-1">{q.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setCurrentQuestionId(q.id);
                      setIsModalOpen(true);
                    }}
                    className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeQuestion(q.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              onClick={() => {
                setCurrentQuestionId(null);
                setIsModalOpen(true);
              }}
              className="w-full py-4 border-dashed border-primary text-primary hover:bg-primary/5"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Another Question
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button 
          variant="outline" 
          onClick={() => setStep(1)}
          className="px-10 border-border text-muted-foreground hover:bg-muted"
        >
          Previous
        </Button>
        <Button 
          onClick={handleSaveExam}
          className="px-10 py-6 h-auto font-bold rounded-xl text-lg min-w-[200px]"
          isLoading={loading}
          disabled={questions.length === 0}
        >
          Publish Online Test
        </Button>
      </div>

      {isModalOpen && (
        <QuestionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          questionId={currentQuestionId}
        />
      )}
    </div>
  );
}
