import { create } from 'zustand';

interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

interface Question {
  title: string;
  type: 'RADIO' | 'CHECKBOX' | 'TEXT';
  options: QuestionOption[];
}

interface ExamData {
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestions: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number;
  negativeMarking: number;
  questions: Question[];
}

interface ExamStore {
  step: number;
  setStep: (step: number) => void;
  examData: ExamData;
  updateExamData: (data: Partial<ExamData>) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (index: number) => void;
  reset: () => void;
}

const initialExamData: ExamData = {
  title: '',
  totalCandidates: 0,
  totalSlots: 0,
  totalQuestions: 0,
  questionType: 'MCQ',
  startTime: '',
  endTime: '',
  duration: 60,
  negativeMarking: 0,
  questions: [],
};

const useExamStore = create<ExamStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  examData: initialExamData,
  updateExamData: (data) =>
    set((state) => ({
      examData: { ...state.examData, ...data },
    })),
  addQuestion: (question) =>
    set((state) => ({
      examData: {
        ...state.examData,
        questions: [...state.examData.questions, question],
      },
    })),
  removeQuestion: (index) =>
    set((state) => ({
      examData: {
        ...state.examData,
        questions: state.examData.questions.filter((_, i) => i !== index),
      },
    })),
  reset: () => set({ step: 1, examData: initialExamData }),
}));

export default useExamStore;
