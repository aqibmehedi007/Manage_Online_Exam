'use client';

import React, { useState, useEffect } from 'react';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Trash2, Plus } from 'lucide-react';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string | null;
  onSaveAndAddMore?: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function QuestionModal({ isOpen, onClose, questionId, onSaveAndAddMore }: QuestionModalProps) {
  const { questions, updateQuestion } = useCreateExamStore();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'RADIO' | 'CHECKBOX' | 'TEXT'>('RADIO');
  const [score, setScore] = useState(1);
  const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const questionNumber = questionId
    ? questions.findIndex(q => q.id === questionId) + 1
    : questions.length + 1;

  useEffect(() => {
    if (questionId) {
      const q = questions.find(q => q.id === questionId);
      if (q) {
        setTitle(q.title);
        setType(q.type);
        setOptions(q.options.length > 0 ? q.options : [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
        ]);
      }
    } else {
      setTitle('');
      setType('RADIO');
      setScore(1);
      setOptions([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ]);
    }
  }, [questionId, questions]);

  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleUpdateOption = (index: number, text: string) => {
    const newOpts = [...options];
    newOpts[index] = { ...newOpts[index], text };
    setOptions(newOpts);
  };

  const handleToggleCorrect = (index: number) => {
    const newOpts = [...options];
    if (type === 'RADIO') {
      newOpts.forEach((o, i) => { newOpts[i] = { ...o, isCorrect: i === index }; });
    } else {
      newOpts[index] = { ...newOpts[index], isCorrect: !newOpts[index].isCorrect };
    }
    setOptions(newOpts);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const doSave = () => {
    if (!title.trim()) return alert('Please enter a question title');
    if (type !== 'TEXT' && options.length < 2) return alert('Add at least 2 options');
    if (type !== 'TEXT' && !options.some(o => o.isCorrect)) return alert('Mark at least one correct answer');

    const questionData = { title, type, options: type === 'TEXT' ? [] : options };

    if (questionId) {
      updateQuestion(questionId, questionData);
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      useCreateExamStore.setState((state) => ({
        questions: [...state.questions, { id, ...questionData }]
      }));
    }
    return true;
  };

  const handleSave = () => {
    if (doSave()) onClose();
  };

  const handleSaveAndAddMore = () => {
    if (doSave()) {
      setTitle('');
      setType('RADIO');
      setScore(1);
      setOptions([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ]);
      if (onSaveAndAddMore) onSaveAndAddMore();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[700px] bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-7 w-7 rounded-full border border-gray-300 text-xs font-medium text-gray-500">
              {questionNumber}
            </div>
            <span className="font-semibold text-[#1e293b]">Question {questionNumber}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Score:</span>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-12 h-8 text-center border border-gray-200 rounded text-sm outline-none focus:border-primary"
                min={1}
              />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="h-8 px-3 text-sm border border-gray-200 rounded outline-none focus:border-primary bg-white"
            >
              <option value="RADIO">Radio</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="TEXT">Text</option>
            </select>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {/* Question Title - Rich Text Area */}
          <div className="rounded-lg border border-gray-200 bg-[#f8fafc]">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 text-gray-400 text-xs">
              <span>↩</span> <span>↪</span>
              <span className="text-gray-500">Normal text ▾</span>
              <span>☰ ▾</span>
              <span className="font-bold text-gray-600">B</span>
              <span className="italic text-gray-600">I</span>
            </div>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your question here..."
              className="w-full min-h-[80px] px-4 py-3 bg-transparent outline-none resize-none text-sm text-[#1e293b]"
            />
          </div>

          {/* Options (for Radio/Checkbox) */}
          {type !== 'TEXT' && (
            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-full border border-gray-300 text-xs font-medium text-gray-500">
                      {LETTERS[idx]}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      {type === 'RADIO' ? (
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={opt.isCorrect}
                          onChange={() => handleToggleCorrect(idx)}
                          className="accent-primary"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={opt.isCorrect}
                          onChange={() => handleToggleCorrect(idx)}
                          className="accent-primary"
                        />
                      )}
                      Set as correct answer
                    </label>
                    <div className="flex-1" />
                    <button
                      onClick={() => handleRemoveOption(idx)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="ml-9 rounded-lg border border-gray-200 bg-[#f8fafc]">
                    <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-100 text-gray-400 text-xs">
                      <span>↩</span> <span>↪</span>
                      <span className="text-gray-500">Normal text ▾</span>
                      <span>☰ ▾</span>
                      <span className="font-bold text-gray-600">B</span>
                      <span className="italic text-gray-600">I</span>
                    </div>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleUpdateOption(idx, e.target.value)}
                      placeholder={`Option ${LETTERS[idx]}`}
                      className="w-full px-4 py-3 bg-transparent outline-none text-sm text-[#1e293b]"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddOption}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 pt-2"
              >
                <Plus className="h-4 w-4" />
                Another options
              </button>
            </div>
          )}

          {/* Text type placeholder */}
          {type === 'TEXT' && (
            <div className="rounded-lg border border-gray-200 bg-[#f8fafc] p-4 text-sm text-gray-400 italic">
              Candidates will see a text area to write their answer.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="h-10 px-8 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleSaveAndAddMore}
            className="h-10 px-8 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save & Add More
          </button>
        </div>
      </div>
    </div>
  );
}
