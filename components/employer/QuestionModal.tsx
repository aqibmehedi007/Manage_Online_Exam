'use client';

import React, { useState, useEffect } from 'react';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string | null;
}

export default function QuestionModal({ isOpen, onClose, questionId }: QuestionModalProps) {
  const { questions, addQuestion, updateQuestion } = useCreateExamStore();
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'RADIO' | 'CHECKBOX' | 'TEXT'>('RADIO');
  const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([
    { text: '', isCorrect: false }
  ]);

  useEffect(() => {
    if (questionId) {
      const q = questions.find(q => q.id === questionId);
      if (q) {
        setTitle(q.title);
        setType(q.type);
        setOptions(q.options || []);
      }
    }
  }, [questionId, questions]);

  const handleAddOption = () => {
    setOptions([...options, { text: '', isCorrect: false }]);
  };

  const handleUpdateOption = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleToggleCorrect = (index: number) => {
    const newOptions = [...options];
    if (type === 'RADIO') {
      newOptions.forEach((o, i) => o.isCorrect = i === index);
    } else {
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!title.trim()) return alert('Please enter a question title');
    
    if (type !== 'TEXT' && options.length < 2) {
      return alert('Please add at least 2 options');
    }

    if (type !== 'TEXT' && !options.some(o => o.isCorrect)) {
      return alert('Please select at least one correct answer');
    }

    const questionData = {
      title,
      type,
      options: type === 'TEXT' ? [] : options
    };

    if (questionId) {
      updateQuestion(questionId, questionData);
    } else {
      // Logic for adding new question is simplified in store
      const id = Math.random().toString(36).substr(2, 9);
      useCreateExamStore.setState((state) => ({
        questions: [...state.questions, { id, ...questionData }]
      }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-card rounded-xl border border-border card-shadow flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border p-6 font-bold">
          <span>{questionId ? 'Edit Question' : 'Add New Question'}</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Input 
            label="Question Title" 
            placeholder="Enter your question here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Question Type</label>
            <div className="flex space-x-4">
              {['RADIO', 'CHECKBOX', 'TEXT'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                    type === t ? 'bg-primary/10 border-primary text-primary' : 'bg-background border-border hover:bg-muted'
                  }`}
                >
                  {t.charAt(0) + t.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {type !== 'TEXT' && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Options</label>
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleCorrect(idx)}
                    className={`h-6 w-6 flex items-center justify-center rounded-full border transition-colors ${
                      opt.isCorrect ? 'bg-primary border-primary text-white' : 'bg-background border-border'
                    }`}
                  >
                    {opt.isCorrect && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <input
                    className="flex-1 h-10 px-3 bg-muted/30 border border-border rounded-md text-sm outline-none focus:ring-1 focus:ring-primary"
                    placeholder={`Option ${idx + 1}`}
                    value={opt.text}
                    onChange={(e) => handleUpdateOption(idx, e.target.value)}
                  />
                  <button onClick={() => handleRemoveOption(idx)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" className="text-primary hover:bg-primary/5 h-8 p-0" onClick={handleAddOption}>
                <Plus className="mr-2 h-4 w-4" /> Add Option
              </Button>
            </div>
          )}
        </div>

        <div className="border-t border-border p-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="px-8 bg-primary">Save Question</Button>
        </div>
      </div>
    </div>
  );
}
