'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Edit3, Save } from 'lucide-react';
import QuestionModal from '@/components/employer/QuestionModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const examSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  totalCandidates: z.number().min(1, 'Total candidates must be at least 1'),
  totalSlots: z.number().min(1, 'Total slots must be at least 1'),
  questionSets: z.number().min(1, 'Question sets must be at least 1'),
  questionType: z.string().min(1, 'Question type is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  negativeMarking: z.number().min(0, 'Negative marking cannot be negative'),
});

type ExamFormData = z.infer<typeof examSchema>;

export default function CreateTestPage() {
  const router = useRouter();
  const { step, setStep, basicInfo, updateBasicInfo, questions, removeQuestion, reset } = useCreateExamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<ExamFormData>({
    resolver: zodResolver(examSchema),
    defaultValues: basicInfo
  });

  // Keep form in sync with Zustand if it changes externally
  useEffect(() => {
    resetForm(basicInfo);
  }, [basicInfo, resetForm]);

  const onStep1Submit = (data: ExamFormData) => {
    updateBasicInfo(data);
    setViewMode(true);
  };

  const handleContinueToStep2 = () => {
    setStep(2);
  };

  const handlePublish = async () => {
    if (questions.length === 0) return alert('Please add at least one question');
    setLoading(true);
    try {
      const res = await fetch('/api/employer/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...basicInfo, questions }),
      });
      if (res.ok) {
        reset();
        router.push('/employer');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save exam');
      }
    } catch {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1024px] space-y-6 pb-20">
      {/* Step Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#1e293b] mb-4">Manage Online Test</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              {step >= 2 || viewMode ? (
                <CheckCircle className="h-5 w-5 text-primary fill-primary text-white" />
              ) : (
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-white text-xs font-bold">1</div>
              )}
              <span className={`text-sm font-medium ${step === 1 ? 'text-primary' : 'text-gray-500'}`}>Basic Info</span>
            </div>
            {/* Connector */}
            <div className="w-16 h-px bg-gray-300" />
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              {step === 2 ? (
                <CheckCircle className="h-5 w-5 text-primary fill-primary text-white" />
              ) : (
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-gray-300 text-white text-xs font-bold">2</div>
              )}
              <span className={`text-sm font-medium ${step === 2 ? 'text-primary' : 'text-gray-500'}`}>Questions Sets</span>
            </div>
          </div>
          <button
            onClick={() => { reset(); router.push('/employer'); }}
            className="px-5 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Step 1: Basic Info - Form Mode */}
      {step === 1 && !viewMode && (
        <form onSubmit={handleSubmit(onStep1Submit)} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <h3 className="text-base font-bold text-[#1e293b] mb-6 border-b border-gray-100 pb-4">Basic Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Online Test Title <span className="text-red-500">*</span></label>
              <input
                {...register('title')}
                type="text"
                placeholder="Enter online test title"
                className={`w-full px-4 h-12 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Total Candidates <span className="text-red-500">*</span></label>
                <input
                  {...register('totalCandidates', { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.totalCandidates ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
                {errors.totalCandidates && <p className="text-xs text-red-500 mt-1">{errors.totalCandidates.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Total Slots <span className="text-red-500">*</span></label>
                <input
                  {...register('totalSlots', { valueAsNumber: true })}
                  type="number"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.totalSlots ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Question Sets <span className="text-red-500">*</span></label>
                <input
                  {...register('questionSets', { valueAsNumber: true })}
                  type="number"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.questionSets ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Question Type <span className="text-red-500">*</span></label>
                <select
                  {...register('questionType')}
                  className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm appearance-none bg-white"
                >
                  <option value="MCQ">MCQ</option>
                  <option value="WRITTEN">Written</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Start Time <span className="text-red-500">*</span></label>
                <input
                  {...register('startTime')}
                  type="datetime-local"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.startTime ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">End Time <span className="text-red-500">*</span></label>
                <input
                  {...register('endTime')}
                  type="datetime-local"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.endTime ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Duration (Minutes) <span className="text-red-500">*</span></label>
                <input
                  {...register('duration', { valueAsNumber: true })}
                  type="number"
                  className={`w-full px-4 h-12 rounded-xl border ${errors.duration ? 'border-red-500' : 'border-gray-200'} focus:border-primary outline-none text-sm`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Negative Marking (Optional)</label>
                <input
                  {...register('negativeMarking', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  className="w-full px-4 h-12 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-10">
            <Button
              type="submit"
              className="px-10 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
              Save Information
            </Button>
          </div>
        </form>
      )}

      {/* Step 1: Basic Info - View Mode */}
      {step === 1 && viewMode && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#1e293b]">Basic Information</h3>
            <button
              onClick={() => setViewMode(false)}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Title</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Candidates</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.totalCandidates}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Slots</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.totalSlots}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Question Sets</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.questionSets}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Question Type</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.questionType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Duration</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.duration} Min</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Negative Marking</p>
              <p className="text-sm font-semibold text-[#1e293b]">{basicInfo.negativeMarking}</p>
            </div>
          </div>

          <div className="flex justify-end mt-12">
            <Button
              onClick={handleContinueToStep2}
              className="px-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
              Continue to Step 2
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Questions */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#1e293b]">Questions Sets ({questions.length})</h3>
            <button
              onClick={() => { setCurrentQuestionId(null); setIsModalOpen(true); }}
              className="px-6 py-2.5 text-sm font-bold bg-[#f1f5f9] text-[#475569] rounded-lg hover:bg-gray-200 transition-colors"
            >
              + Add Question Manually
            </button>
          </div>

          {questions.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center border border-dashed border-gray-300">
                <Edit3 className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1e293b]">No Online Test Available</p>
                <p className="text-xs text-gray-400">Click the button above to add your first question.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {questions.map((q, idx) => (
                <div key={q.id} className="group p-5 rounded-2xl border border-gray-100 bg-[#f8fafc] hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 bg-white rounded border border-gray-200 text-[#64748b]">
                          {q.type}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">Point: 1</span>
                      </div>
                      <p className="text-sm font-bold text-[#1e293b]">Q{idx+1}. {q.title}</p>
                      
                      {q.type !== 'TEXT' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex gap-2 items-center">
                              <span className="text-[10px] font-bold h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center tracking-tighter shrink-0 text-gray-400">
                                {LETTERS[oIdx]}
                              </span>
                              <span className={`text-xs ${opt.isCorrect ? 'text-primary font-bold' : 'text-gray-500'}`}>
                                {opt.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 shrink-0 px-2">
                       <button
                         onClick={() => { setCurrentQuestionId(q.id); setIsModalOpen(true); }}
                         className="text-primary text-xs font-bold hover:underline"
                       >
                         Edit
                       </button>
                       <button
                         onClick={() => removeQuestion(q.id)}
                         className="text-red-500 text-xs font-bold hover:underline"
                       >
                         Remove
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-100">
             <button
                onClick={() => setStep(1)}
                className="px-8 h-12 text-sm font-bold text-[#64748b] hover:text-[#1e293b] transition-colors"
             >
                Previous Step
             </button>
             <Button
                onClick={handlePublish}
                isLoading={loading}
                className="px-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
             >
                Publish Test
             </Button>
          </div>
        </div>
      )}

      {/* Question Modal */}
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setCurrentQuestionId(null); }}
        questionId={currentQuestionId}
      />
    </div>
  );
}
