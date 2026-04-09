'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  ChevronLeft,
  Mail,
  User as UserIcon,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface Submission {
  id: string;
  status: 'ASSIGNED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  score: number;
  tabSwitches: number;
  fullscreenExits: number;
  startedAt: string | null;
  submittedAt: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    gender: string | null;
  };
}

export default function ExamResultsPage() {
  const params = useParams();
  const examId = params.id as string;
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch(`/api/employer/exams/${examId}/submissions`);
        const data = await res.json();
        if (res.ok) setSubmissions(data);
      } catch (error) {
        console.error('Failed to fetch submissions', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, [examId]);

  const filtered = submissions.filter(s => 
    s.user.name?.toLowerCase().includes(search.toLowerCase()) || 
    s.user.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: submissions.length,
    completed: submissions.filter(s => s.status === 'COMPLETED').length,
    avgScore: submissions.filter(s => s.status === 'COMPLETED').length 
      ? (submissions.filter(s => s.status === 'COMPLETED').reduce((acc, s) => acc + s.score, 0) / submissions.filter(s => s.status === 'COMPLETED').length).toFixed(1)
      : '0'
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/employer')}
            className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-primary"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b]">Candidate Results</h1>
            <p className="text-sm text-gray-400 mt-1">Detailed performance and proctoring report for this test</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search candidate by name or email" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Candidates</p>
            <h3 className="text-2xl font-bold text-[#1e293b]">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Exams Completed</p>
            <h3 className="text-2xl font-bold text-[#1e293b]">{stats.completed}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Average Score</p>
            <h3 className="text-2xl font-bold text-[#1e293b]">{stats.avgScore}%</h3>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Candidate</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Score</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Proctoring Logs</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8 bg-gray-50/20"></td>
                  </tr>
                ))
              ) : filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                        {sub.user.image ? (
                          <Image src={sub.user.image} alt={sub.user.name || ''} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-indigo-50 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#1e293b] truncate capitalize">{sub.user.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                           <p className="text-xs text-gray-400 truncate">{sub.user.email}</p>
                           {sub.user.gender && (
                             <span className="px-1.5 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">{sub.user.gender}</span>
                           )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
                      sub.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                      sub.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {sub.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <p className={`text-xl font-bold ${sub.status === 'COMPLETED' ? 'text-[#1e293b]' : 'text-gray-200'}`}>
                      {sub.status === 'COMPLETED' ? `${sub.score}%` : '--'}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                       {sub.tabSwitches > 0 ? (
                         <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100" title="Tab Switch Detected">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-bold">{sub.tabSwitches} Switches</span>
                         </div>
                       ) : sub.status === 'COMPLETED' ? (
                         <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[11px] font-bold">Clean Session</div>
                       ) : <span className="text-gray-200">--</span>}

                       {sub.fullscreenExits > 0 && (
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-100" title="Full Screen Exit">
                             <ShieldAlert className="h-3.5 w-3.5" />
                             <span className="text-[11px] font-bold">{sub.fullscreenExits} Exits</span>
                          </div>
                       )}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-400 hover:text-primary">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
