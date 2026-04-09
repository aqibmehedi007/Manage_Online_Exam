'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Edit3 } from 'lucide-react';
import QuestionModal from '@/components/employer/QuestionModal';

export default function CreateTestPage() {
  const router = useRouter();
  const { step, setStep, basicInfo, updateBasicInfo, questions, removeQuestion, reset } = useCreateExamStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const handleSaveBasicInfo = () => {
    if (!basicInfo.title) return alert('Please enter a title');
    setViewMode(true);
  };

  const handleContinueToStep2 = () => {
    setStep(2);
  };

  const handlePublish = async () => {
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
    <div className="mx-auto max-w-[1000px] space-y-6">
      {/* Step Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
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

      {/* Step 1: Basic Info */}
      {step === 1 && !viewMode && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-base font-bold text-[#1e293b] mb-6">Basic Information</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Online Test Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={basicInfo.title}
                onChange={(e) => updateBasicInfo({ title: e.target.value })}
                placeholder="Enter online test title"
                className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Total Candidates <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  value={basicInfo.totalCandidates || ''}
                  onChange={(e) => updateBasicInfo({ totalCandidates: Number(e.target.value) })}
                  placeholder="Enter total candidates"
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Total Slots <span className="text-red-500">*</span></label>
                <select
                  value={basicInfo.totalSlots}
                  onChange={(e) => updateBasicInfo({ totalSlots: Number(e.target.value) })}
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors bg-white appearance-none"
                >
                  <option value="">Select total slots</option>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Total Question Set <span className="text-red-500">*</span></label>
                <select
                  value={basicInfo.questionSets}
                  onChange={(e) => updateBasicInfo({ questionSets: Number(e.target.value) })}
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors bg-white appearance-none"
                >
                  <option value="">Select total question set</option>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Question Type <span className="text-red-500">*</span></label>
                <select
                  value={basicInfo.questionType}
                  onChange={(e) => updateBasicInfo({ questionType: e.target.value })}
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors bg-white appearance-none"
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Written">Written</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Start Time <span className="text-red-500">*</span></label>
                <input
                  type="datetime-local"
                  value={basicInfo.startTime}
                  onChange={(e) => updateBasicInfo({ startTime: e.target.value })}
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">End Time <span className="text-red-500">*</span></label>
                <input
                  type="datetime-local"
                  value={basicInfo.endTime}
                  onChange={(e) => updateBasicInfo({ endTime: e.target.value })}
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Duration</label>
                <input
                  type="number"
                  value={basicInfo.duration || ''}
                  onChange={(e) => updateBasicInfo({ duration: Number(e.target.value) })}
                  placeholder="Duration Time"
                  className="w-full h-11 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: View Mode (after save) */}
      {step === 1 && viewMode && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#1e293b]">Basic Information</h3>
            <button onClick={() => setViewMode(false)} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80">
              <Edit3 className="h-4 w-4" />
              Edit
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-sm text-gray-400">Online Test Title</span>
              <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.title}</p>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <span className="text-sm text-gray-400">Total Candidates</span>
                <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.totalCandidates ? basicInfo.totalCandidates.toLocaleString() : 'Not Set'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Total Slots</span>
                <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.totalSlots || 'Not Set'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Total Question Set</span>
                <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.questionSets || 'Not Set'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-400">Duration Per Slots (Minutes)</span>
                <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.duration || 'Not Set'}</p>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-400">Question Type</span>
              <p className="text-sm font-medium text-[#1e293b] mt-0.5">{basicInfo.questionType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Question List */}
      {step === 2 && (
        <div className="space-y-4">
          {questions.length > 0 && questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#1e293b]">Question {idx + 1}</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium border border-gray-200 rounded text-gray-500">
                    {q.type === 'RADIO' ? 'MCQ' : q.type === 'CHECKBOX' ? 'Checkbox' : 'Text'}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium border border-gray-200 rounded text-gray-500">1 pt</span>
                </div>
              </div>

              <p className="font-semibold text-sm text-[#1e293b] mb-3">{q.title}</p>

              {q.type !== 'TEXT' && q.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  className={`flex items-center gap-3 px-4 py-2.5 mb-1.5 rounded-lg text-sm ${
                    opt.isCorrect ? 'bg-[#f0fdf4] border border-green-200' : 'border border-transparent'
                  }`}
                >
                  <span className="text-gray-500">{LETTERS[oIdx]}.</span>
                  <span className="text-[#1e293b]">{opt.text}</span>
                  {opt.isCorrect && (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  )}
                </div>
              ))}

              {q.type === 'TEXT' && (
                <p className="text-sm text-gray-400 italic px-4 py-2">Written answer expected from candidate.</p>
              )}

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => { setCurrentQuestionId(q.id); setIsModalOpen(true); }}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeQuestion(q.id)}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove From Exam
                </button>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <button
            onClick={() => { setCurrentQuestionId(null); setIsModalOpen(true); }}
            className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors text-sm"
          >
            Add Question
          </button>
        </div>
      )}

      {/* Footer Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
        <button
          onClick={() => {
            if (step === 2) setStep(1);
            else { reset(); router.push('/employer'); }
          }}
          className="px-8 py-2.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        {step === 1 && !viewMode && (
          <Button onClick={handleSaveBasicInfo} className="px-8 py-2.5 text-sm font-semibold bg-primary rounded-lg">
            Save & Continue
          </Button>
        )}
        {step === 1 && viewMode && (
          <Button onClick={handleContinueToStep2} className="px-8 py-2.5 text-sm font-semibold bg-primary rounded-lg">
            Save & Continue
          </Button>
        )}
        {step === 2 && (
          <Button
            onClick={handlePublish}
            isLoading={loading}
            disabled={questions.length === 0}
            className="px-8 py-2.5 text-sm font-semibold bg-primary rounded-lg"
          >
            Publish Online Test
          </Button>
        )}
      </div>

      {/* Question Modal */}
      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        questionId={currentQuestionId}
        onSaveAndAddMore={() => setCurrentQuestionId(null)}
      />
    </div>
  );
}
