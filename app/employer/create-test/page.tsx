'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChevronDown, Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import useExamStore from '@/lib/store';

export default function CreateTestPage() {
  const router = useRouter();
  const { step, setStep, examData, updateExamData, addQuestion, removeQuestion, reset } = useExamStore();
  const [loading, setLoading] = useState(false);

  const [currentQuestionTitle, setCurrentQuestionTitle] = useState('');
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const handleAddQuestion = () => {
    if (!currentQuestionTitle.trim()) return;
    addQuestion({
      title: currentQuestionTitle,
      type: 'RADIO',
      options: [...options],
    });
    setCurrentQuestionTitle('');
    setOptions([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
  };

  const handleSaveExam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/employer/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });

      if (res.ok) {
        reset();
        router.push('/employer');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save exam');
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-10">
      <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-slate-800">Manage Online Test</h1>
          <Button variant="outline" onClick={() => router.push('/employer')} className="rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 px-8 h-12">
            Back to Dashboard
          </Button>
        </div>

        {/* Stepper */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <span className={`text-sm font-bold ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>Basic Info</span>
          </div>
          <div className="h-[1px] w-16 bg-slate-200"></div>
          <div className="flex items-center space-x-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <span className={`text-sm font-bold ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>Questions Sets</span>
          </div>
        </div>
      </div>

      {step === 1 ? (
        <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-10 border-b border-slate-50 pb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-3">Online Test Title <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter online test title" className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={examData.title} onChange={(e) => updateExamData({ title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Total Candidates <span className="text-red-500">*</span></label>
              <input type="number" placeholder="Enter total candidates" className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={examData.totalCandidates} onChange={(e) => updateExamData({ totalCandidates: parseInt(e.target.value) })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Total Slots <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none" value={examData.totalSlots} onChange={(e) => updateExamData({ totalSlots: parseInt(e.target.value) })}>
                  <option value="">Select total slots</option>
                  <option value="1">1 Slot</option>
                  <option value="3">3 Slots</option>
                  <option value="5">5 Slots</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Total Question Set <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none" value={examData.totalQuestions} onChange={(e) => updateExamData({ totalQuestions: parseInt(e.target.value) })}>
                  <option value="">Select total question set</option>
                  <option value="10">10 Questions</option>
                  <option value="20">20 Questions</option>
                  <option value="30">30 Questions</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Question Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none" value={examData.questionType} onChange={(e) => updateExamData({ questionType: e.target.value })}>
                  <option value="MCQ">Multiple Choice Questions</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-3">Start Time <span className="text-red-500">*</span></label>
              <div className="relative group">
                <input type="text" placeholder="2024-05-20 09:00:00" className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={examData.startTime} onChange={(e) => updateExamData({ startTime: e.target.value })} />
                <Clock className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-3">End Time <span className="text-red-500">*</span></label>
              <div className="relative group">
                <input type="text" placeholder="2024-05-20 17:00:00" className="w-full h-14 px-6 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={examData.endTime} onChange={(e) => updateExamData({ endTime: e.target.value })} />
                <Clock className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">Duration (min)</label>
              <input type="number" className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500" value={examData.duration} onChange={(e) => updateExamData({ duration: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="mt-16 flex items-center justify-between">
            <Button variant="outline" onClick={() => reset()} className="rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 px-12 h-14">Cancel</Button>
            <Button onClick={() => setStep(2)} className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold px-12 h-14 shadow-lg shadow-primary/20">Save & Continue</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-10">Question Builder</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Question Title</label>
                <input type="text" placeholder="Enter question text" className="w-full h-14 px-6 border border-slate-200 rounded-2xl" value={currentQuestionTitle} onChange={(e) => setCurrentQuestionTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {options.map((opt, i) => (
                  <div key={i} className={`flex items-center space-x-4 p-4 border rounded-2xl ${opt.isCorrect ? 'border-primary bg-primary/5' : 'border-slate-100'}`}>
                    <input type="text" placeholder={`Option ${i + 1}`} className="flex-1 bg-transparent outline-none text-sm font-medium" value={opt.text} onChange={(e) => {
                      const newOpts = [...options];
                      newOpts[i].text = e.target.value;
                      setOptions(newOpts);
                    }} />
                    <button onClick={() => {
                      const newOpts = options.map((o, idx) => ({ ...o, isCorrect: idx === i }));
                      setOptions(newOpts);
                    }} className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${opt.isCorrect ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                      {opt.isCorrect && <div className="h-2 w-2 rounded-full bg-white" />}
                    </button>
                  </div>
                ))}
              </div>
              <Button onClick={handleAddQuestion} className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold"><Plus className="mr-2 h-5 w-5" /> Add Question to Set</Button>
            </div>
          </div>

          {examData.questions.length > 0 && (
            <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 space-y-6">
              <h3 className="text-lg font-bold text-slate-800">Added Questions ({examData.questions.length})</h3>
              <div className="space-y-4">
                {examData.questions.map((q, i) => (
                  <div key={i} className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div>
                      <span className="text-xs font-bold text-primary uppercase mb-1 block">Question {i + 1}</span>
                      <p className="font-bold text-slate-700">{q.title}</p>
                    </div>
                    <button onClick={() => removeQuestion(i)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="h-5 w-5" /></button>
                  </div>
                ))}
              </div>
              <Button onClick={handleSaveExam} loading={loading} className="w-full h-16 bg-primary text-white rounded-2xl text-xl font-bold shadow-xl shadow-primary/20">Finalize & Create Online Test</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
