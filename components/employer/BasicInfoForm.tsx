'use client';

import React from 'react';
import { useCreateExamStore } from '@/store/useCreateExamStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function BasicInfoForm() {
  const { basicInfo, updateBasicInfo, setStep } = useCreateExamStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="bg-muted/30 rounded-lg p-8 border border-border">
        <h2 className="text-lg font-bold mb-8">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          <div className="md:col-span-2">
            <Input
              label="Online Test Title *"
              placeholder="Enter online test title"
              value={basicInfo.title}
              onChange={(e) => updateBasicInfo({ title: e.target.value })}
              required
            />
          </div>

          <Input
            label="Total Candidates *"
            type="number"
            placeholder="Enter total candidates"
            value={basicInfo.totalCandidates}
            onChange={(e) => updateBasicInfo({ totalCandidates: parseInt(e.target.value) })}
            required
          />

          <div className="space-y-1">
            <label className="text-sm font-medium leading-none">Total Slots *</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={basicInfo.totalSlots}
              onChange={(e) => updateBasicInfo({ totalSlots: parseInt(e.target.value) })}
            >
              {[1, 2, 3, 4, 5].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium leading-none">Total Question Set *</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={basicInfo.questionSets}
              onChange={(e) => updateBasicInfo({ questionSets: parseInt(e.target.value) })}
            >
              {[1, 2, 3].map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium leading-none">Question Type *</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={basicInfo.questionType}
              onChange={(e) => updateBasicInfo({ questionType: e.target.value })}
            >
              <option value="MCQ">Multiple Choice</option>
              <option value="Written">Written</option>
            </select>
          </div>

          <Input
            label="Start Time *"
            type="datetime-local"
            value={basicInfo.startTime}
            onChange={(e) => updateBasicInfo({ startTime: e.target.value })}
            required
          />

          <Input
            label="End Time *"
            type="datetime-local"
            value={basicInfo.endTime}
            onChange={(e) => updateBasicInfo({ endTime: e.target.value })}
            required
          />

          <Input
            label="Duration (Minutes) *"
            type="number"
            value={basicInfo.duration}
            onChange={(e) => updateBasicInfo({ duration: parseInt(e.target.value) })}
            required
          />

          <Input
            label="Negative Marking *"
            type="number"
            step="0.01"
            value={basicInfo.negativeMarking}
            onChange={(e) => updateBasicInfo({ negativeMarking: parseFloat(e.target.value) })}
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline" type="button" className="px-10 border-border text-muted-foreground hover:bg-muted">
          Cancel
        </Button>
        <Button type="submit" className="px-10 py-6 h-auto font-bold rounded-xl text-lg">
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
