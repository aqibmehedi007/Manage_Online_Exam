'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

interface ExamQuestion {
  id: string;
  title: string;
  type: 'RADIO' | 'CHECKBOX' | 'TEXT';
  options: { id: string; text: string }[];
}

function LogoText() {
  return (
    <div className="flex items-center gap-1">
      <span className="text-lg font-black tracking-tight text-[#1e293b]">
        AK<span className="text-primary italic">ij</span>
      </span>
      <span className="text-xs font-bold text-[#1e293b] uppercase tracking-widest ml-0.5">Resource</span>
    </div>
  );
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;

  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const tabSwitchCount = useRef(0);

  // Fetch exam
  useEffect(() => {
    async function fetchExam() {
      try {
        const res = await fetch(`/api/candidate/exams/${examId}`);
        const data = await res.json();
        if (res.ok) {
          setExam(data.exam || data);
          const qs = data.exam?.questions || data.questions || [];
          setQuestions(qs);
          setTimeLeft(((data.exam?.duration || data.duration) || 30) * 60);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
  }, [examId]);

  // Timer
  useEffect(() => {
    if (submitted || timedOut || loading || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimedOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timedOut, loading, timeLeft]);

  // Tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !submitted && !timedOut) {
        tabSwitchCount.current += 1;
        fetch(`/api/candidate/exams/${examId}/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'TAB_SWITCH', count: tabSwitchCount.current }),
        }).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [submitted, timedOut, examId]);

  const handleSubmit = async () => {
    try {
      await fetch(`/api/candidate/exams/${examId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      setSubmitted(true);
    } catch {
      alert('Failed to submit');
    }
  };

  const handleSelectOption = (questionId: string, optionId: string, type: string) => {
    setAnswers(prev => {
      if (type === 'RADIO') {
        return { ...prev, [questionId]: [optionId] };
      } else {
        const current = prev[questionId] || [];
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        }
        return { ...prev, [questionId]: [...current, optionId] };
      }
    });
  };

  const handleSkip = () => {
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const handleSaveAndContinue = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmit();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ── Timeout Modal ──
  if (timedOut) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        <nav className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-8">
          <LogoText />
          <h1 className="text-base font-bold text-[#1e293b]">Akij Resource</h1>
          <div className="w-36" />
        </nav>
        <main className="flex-1 flex items-center justify-center p-8 relative">
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-10 max-w-lg text-center shadow-xl">
              <div className="text-5xl mb-4">⏰</div>
              <h2 className="text-xl font-bold text-[#1e293b] mb-3">Timeout!</h2>
              <p className="text-sm text-gray-500 mb-6">
                Your exam time has been finished. Thank you for participating.
              </p>
              <button
                onClick={() => router.push('/candidate')}
                className="px-6 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Test Completed ──
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        <nav className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-8">
          <LogoText />
          <h1 className="text-base font-bold text-[#1e293b]">Akij Resource</h1>
          <div className="w-36" />
        </nav>
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl p-16 max-w-3xl w-full text-center border border-gray-200">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-[#1e293b] mb-3">Test Completed</h2>
            <p className="text-sm text-gray-500 mb-6">
              Congratulations! You have completed your {exam?.title || 'exam'}. Thank you for participating.
            </p>
            <button
              onClick={() => router.push('/candidate')}
              className="px-6 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Exam Engine ──
  const currentQuestion = questions[currentIdx];
  if (!currentQuestion) return <div className="flex min-h-screen items-center justify-center">No questions available.</div>;

  const selectedAnswers = answers[currentQuestion.id] || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Exam Navbar */}
      <nav className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-8">
        <LogoText />
        <h1 className="text-base font-bold text-[#1e293b]">Akij Resource</h1>
        <div className="w-36" />
      </nav>

      <main className="flex-1 flex flex-col items-center px-8 py-8">
        <div className="w-full max-w-[800px] space-y-6">
          {/* Question Progress + Timer */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
            <span className="text-base font-medium text-[#1e293b]">
              Question ({currentIdx + 1}/{questions.length})
            </span>
            <div className="px-6 py-2 bg-[#f1f5f9] rounded-lg">
              <span className="text-base font-semibold text-[#1e293b]">{formatTime(timeLeft)} left</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <p className="text-base font-semibold text-[#1e293b] mb-6">
              Q{currentIdx + 1}. {currentQuestion.title}
            </p>

            {/* Radio Options */}
            {currentQuestion.type === 'RADIO' && (
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedAnswers.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${currentQuestion.id}`}
                      checked={selectedAnswers.includes(opt.id)}
                      onChange={() => handleSelectOption(currentQuestion.id, opt.id, 'RADIO')}
                      className="accent-primary"
                    />
                    <span className="text-sm text-[#1e293b]">{opt.text}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Checkbox Options */}
            {currentQuestion.type === 'CHECKBOX' && (
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-lg border cursor-pointer transition-colors ${
                      selectedAnswers.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAnswers.includes(opt.id)}
                      onChange={() => handleSelectOption(currentQuestion.id, opt.id, 'CHECKBOX')}
                      className="accent-primary"
                    />
                    <span className="text-sm text-[#1e293b]">{opt.text}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Text Answer */}
            {currentQuestion.type === 'TEXT' && (
              <div className="rounded-lg border border-gray-200 bg-[#f8fafc]">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 text-gray-400 text-xs">
                  <span>↩</span> <span>↪</span>
                  <span className="text-gray-500">Normal text ▾</span>
                  <span className="font-bold text-gray-600">B</span>
                  <span className="italic text-gray-600">I</span>
                  <span className="underline text-gray-600">U</span>
                </div>
                <textarea
                  value={textAnswers[currentQuestion.id] || ''}
                  onChange={(e) => setTextAnswers({ ...textAnswers, [currentQuestion.id]: e.target.value })}
                  placeholder="Type your answer here..."
                  className="w-full min-h-[150px] px-4 py-3 bg-transparent outline-none resize-none text-sm text-[#1e293b]"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4">
              <button
                onClick={handleSkip}
                className="px-6 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip this Question
              </button>
              <button
                onClick={handleSaveAndContinue}
                className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                {currentIdx < questions.length - 1 ? 'Save & Continue' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
