import { create } from 'zustand';

interface Question {
  id: string;
  title: string;
  type: 'RADIO' | 'CHECKBOX' | 'TEXT';
  options: { text: string; isCorrect: boolean }[];
}

interface CreateExamState {
  step: number;
  basicInfo: {
    title: string;
    totalCandidates: number;
    totalSlots: number;
    questionSets: number;
    questionType: string;
    startTime: string;
    endTime: string;
    duration: number;
    negativeMarking: number;
  };
  questions: Question[];
  
  setStep: (step: number) => void;
  updateBasicInfo: (info: Partial<CreateExamState['basicInfo']>) => void;
  addQuestion: () => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  removeQuestion: (id: string) => void;
  setQuestions: (questions: Question[]) => void;
  reset: () => void;
}

export const useCreateExamStore = create<CreateExamState>((set) => ({
  step: 1,
  basicInfo: {
    title: '',
    totalCandidates: 0,
    totalSlots: 1,
    questionSets: 1,
    questionType: 'MCQ',
    startTime: '',
    endTime: '',
    duration: 30,
    negativeMarking: 0.25,
  },
  questions: [],

  setStep: (step) => set({ step }),
  
  updateBasicInfo: (info) => set((state) => ({ 
    basicInfo: { ...state.basicInfo, ...info } 
  })),

  addQuestion: () => set((state) => ({
    questions: [
      ...state.questions,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: '',
        type: 'RADIO',
        options: [{ text: '', isCorrect: false }],
      },
    ],
  })),

  updateQuestion: (id, updates) => set((state) => ({
    questions: state.questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
  })),

  removeQuestion: (id) => set((state) => ({
    questions: state.questions.filter((q) => q.id !== id),
  })),

  setQuestions: (questions) => set({ questions }),

  reset: () => set({
    step: 1,
    basicInfo: {
      title: '',
      totalCandidates: 0,
      totalSlots: 1,
      questionSets: 1,
      questionType: 'MCQ',
      startTime: '',
      endTime: '',
      duration: 30,
      negativeMarking: 0.25,
    },
    questions: [],
  }),
}));
