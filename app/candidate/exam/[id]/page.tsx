'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [proctoringEvents, setProctoringEvents] = useState<any[]>([]);

  // Fetch exam data
  useEffect(() => {
    async function fetchExam() {
      const res = await fetch(`/api/candidate/exams/${params.id}`);
      const data = await res.json();
      if (res.ok) {
        setExam(data);
        setTimeLeft(data.duration * 60);
      }
    }
    fetchExam();
  }, [params.id]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0 || isCompleted) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam?.questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        <nav className="flex h-16 items-center border-b border-gray-100 bg-white px-8 shadow-sm">
          <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
            <div className="text-xl font-bold text-[#1e293b]">Akij Resource</div>
          </div>
        </nav>
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white rounded-[32px] p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center max-w-2xl w-full">
            <div className="relative mb-8 h-24 w-24">
              <Image
                src="/success-check.png"
                alt="Success"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">Test Completed</h1>
            <p className="text-slate-500 mb-12 text-lg">
              Congratulations! You have completed your MCQ Exam. Thank you for participating.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/candidate')}
              className="rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 px-12 h-14"
            >
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!exam) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <nav className="flex h-16 items-center border-b border-gray-100 bg-white px-8 shadow-sm">
        <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
          <div className="text-xl font-bold text-[#1e293b]">Akij Resource</div>
          <div className="font-bold text-slate-400">Dhaka Bank</div>
          <div className="w-10"></div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center p-8 pt-12">
        <div className="w-full max-w-4xl space-y-8">
          {/* Question Info & Timer */}
          <div className="bg-white rounded-3xl p-8 flex items-center justify-between border border-slate-100 shadow-sm">
            <span className="text-xl font-bold text-slate-800">Question ({currentQuestionIndex + 1}/{exam.questions.length})</span>
            <div className="bg-slate-100 px-10 py-4 rounded-2xl text-2xl font-bold text-slate-700 font-mono tracking-wider">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-10">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              Q{currentQuestionIndex + 1}. {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option: any) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedOptions[currentQuestion.id] === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                >
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedOptions[currentQuestion.id] === option.id
                      ? 'border-primary'
                      : 'border-slate-300'
                    }`}>
                    {selectedOptions[currentQuestion.id] === option.id && (
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                    )}
                  </div>
                  <span className={`text-lg font-medium ${selectedOptions[currentQuestion.id] === option.id
                      ? 'text-primary'
                      : 'text-slate-600'
                    }`}>
                    {option.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-4">
              <Button
                onClick={handleNext}
                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white text-xl font-bold shadow-lg shadow-primary/20"
              >
                {currentQuestionIndex === exam.questions.length - 1 ? 'Submit' : 'Next Question'}
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="w-full h-16 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 text-xl"
              >
                Skip this Question
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
