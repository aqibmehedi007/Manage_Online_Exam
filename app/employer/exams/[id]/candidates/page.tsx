'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Users, 
  CheckCircle2, 
  Search, 
  ChevronLeft,
  User as UserIcon,
  ShieldAlert,
  BarChart3, 
  ArrowRight,
  UserPlus,
  Loader2
} from 'lucide-react';
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

interface AvailableCandidate {
  id: string;
  name: string;
  email: string;
  image: string | null;
  gender: string | null;
}

export default function ExamResultsPage() {
  const params = useParams();
  const examId = params.id as string;
  const router = useRouter();
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [availableCandidates, setAvailableCandidates] = useState<AvailableCandidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAvailable, setLoadingAvailable] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchAvailable, setSearchAvailable] = useState('');

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch(`/api/employer/exams/${examId}/submissions`);
      const data = await res.json();
      if (res.ok) setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions', error);
    } finally {
      setLoading(false);
    }
  }, [examId]);

  const fetchAvailable = useCallback(async () => {
    try {
      const res = await fetch(`/api/employer/exams/${examId}/available-candidates`);
      const data = await res.json();
      if (res.ok) setAvailableCandidates(data);
    } catch (error) {
      console.error('Failed to fetch available candidates', error);
    } finally {
      setLoadingAvailable(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchSubmissions();
    fetchAvailable();
  }, [fetchSubmissions, fetchAvailable]);

  const handleAssign = async (userId: string) => {
    setAssigningId(userId);
    try {
      const res = await fetch(`/api/employer/exams/${examId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        // Refresh both lists
        await Promise.all([fetchSubmissions(), fetchAvailable()]);
      }
    } catch (error) {
      console.error('Assignment failed', error);
    } finally {
      setAssigningId(null);
    }
  };

  const filteredAssigned = submissions.filter(s => 
    s.user.name?.toLowerCase().includes(search.toLowerCase()) || 
    s.user.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAvailable = availableCandidates.filter(c => 
    c.name?.toLowerCase().includes(searchAvailable.toLowerCase()) || 
    c.email.toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const stats = {
    total: submissions.length,
    completed: submissions.filter(s => s.status === 'COMPLETED').length,
    avgScore: submissions.filter(s => s.status === 'COMPLETED').length 
      ? (submissions.filter(s => s.status === 'COMPLETED').reduce((acc, s) => acc + s.score, 0) / submissions.filter(s => s.status === 'COMPLETED').length).toFixed(1)
      : '0'
  };

  return (
    <div className="mx-auto max-w-[1440px] space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => router.push('/employer')}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-gray-100 shadow-sm transition-all text-gray-400 hover:text-[#2F308C]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-[#2F308C] font-bold text-[10px] uppercase tracking-widest mb-1">
               <div className="h-1 w-4 bg-[#2F308C] rounded-full"></div>
               Candidate Management
            </div>
            <h1 className="text-3xl font-black text-[#1e293b] tracking-tight">Assessment Overview</h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">Detailed performance monitoring and talent acquisition logs.</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-[450px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search candidates by name or email" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#2F308C]/5 focus:border-[#2F308C] transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#2F308C]/20 transition-all group">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2F308C] group-hover:bg-[#2F308C] group-hover:text-white transition-all">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Candidates</p>
                <h3 className="text-3xl font-black text-[#1e293b]">{stats.total}</h3>
              </div>
           </div>
           <div className="h-10 w-10 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-300">
              {stats.total > 0 ? 'LIVE' : 'IDLE'}
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#2F308C]/20 transition-all group">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2F308C] group-hover:bg-[#2F308C] group-hover:text-white transition-all">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Exams Completed</p>
                <h3 className="text-3xl font-black text-[#1e293b]">{stats.completed}</h3>
              </div>
           </div>
           <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">
              {((stats.completed/stats.total || 0)*100).toFixed(0)}% RATE
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#2F308C]/20 transition-all group">
           <div className="flex items-center gap-6">
              <div className="h-16 w-16 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-[#2F308C] group-hover:bg-[#2F308C] group-hover:text-white transition-all">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Average Score</p>
                <h3 className="text-3xl font-black text-[#1e293b]">{stats.avgScore}%</h3>
              </div>
           </div>
           <div className="p-2 bg-indigo-50 rounded-xl">
             <ArrowRight className="h-5 w-5 text-[#2F308C]" />
           </div>
        </div>
      </div>

      {/* Main Results Table */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-[#1e293b] flex items-center gap-3 px-2">
           <Users className="h-6 w-6 text-[#2F308C]" />
           Currently Assigned Candidates
        </h2>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Candidate Profile</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Execution Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Score Matrix</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Proctoring Logs</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  [1, 2, 3].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-10 bg-gray-50/20"></td>
                    </tr>
                  ))
                ) : filteredAssigned.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">No candidates assigned yet. Start by targeting talent below.</td>
                  </tr>
                ) : filteredAssigned.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-gray-200 flex-shrink-0 shadow-sm">
                          {sub.user.image ? (
                            <Image src={sub.user.image} alt={sub.user.name || ''} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#2F308C]/5 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-[#2F308C]" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#1e293b] truncate capitalize">{sub.user.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                             <p className="text-[11px] text-gray-400 truncate">{sub.user.email}</p>
                             {sub.user.gender && (
                               <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-black text-gray-500 uppercase tracking-tighter">{sub.user.gender}</span>
                             )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        sub.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                        sub.status === 'IN_PROGRESS' ? 'bg-blue-50 text-blue-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-center">
                      <p className={`text-2xl font-black ${sub.status === 'COMPLETED' ? 'text-[#1e293b] tracking-tighter' : 'text-gray-200'}`}>
                        {sub.status === 'COMPLETED' ? `${sub.score}%` : '--'}
                      </p>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center gap-3">
                         {sub.tabSwitches > 0 ? (
                           <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 text-orange-600 border border-orange-100" title="Tab Switch Detected">
                              <ShieldAlert className="h-4 w-4" />
                              <span className="text-[11px] font-black">{sub.tabSwitches} Switches</span>
                           </div>
                         ) : sub.status === 'COMPLETED' ? (
                           <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[11px] font-black border border-emerald-100">Clean Session</div>
                         ) : <span className="text-gray-200 font-bold">---</span>}

                         {sub.fullscreenExits > 0 && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100" title="Full Screen Exit">
                               <ShieldAlert className="h-4 w-4" />
                               <span className="text-[11px] font-black">{sub.fullscreenExits} Exits</span>
                            </div>
                         )}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <button className="p-3 bg-gray-50 hover:bg-[#2F308C] rounded-xl transition-all text-gray-400 hover:text-white shadow-sm">
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

      {/* Available Candidates Section */}
      <div className="space-y-6 pt-10 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#1e293b] flex items-center gap-3">
              <UserPlus className="h-7 w-7 text-[#2F308C]" />
              Target Available Talent
            </h2>
            <p className="text-sm text-gray-400 font-medium">Assign new candidates from the global platform pool to this assessment.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search unassigned..." 
              value={searchAvailable}
              onChange={(e) => setSearchAvailable(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-gray-100 rounded-xl outline-none focus:ring-4 focus:ring-[#2F308C]/5 focus:border-[#2F308C] transition-all text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Available Profile</th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] text-right">Acquisition Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loadingAvailable ? (
                  [1, 2].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={2} className="px-8 py-8 bg-gray-50/20"></td>
                    </tr>
                  ))
                ) : filteredAvailable.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-8 py-16 text-center text-gray-400 font-medium italic">All potential candidates are already assigned or no talent found.</td>
                  </tr>
                ) : filteredAvailable.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                          {candidate.image ? (
                            <Image src={candidate.image} alt={candidate.name || ''} width={40} height={40} className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1e293b]">{candidate.name || 'Anonymous'}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleAssign(candidate.id)}
                        disabled={assigningId === candidate.id}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2F308C] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1e293b] transition-all shadow-md shadow-[#2F308C]/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {assigningId === candidate.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : <UserPlus className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />}
                        {assigningId === candidate.id ? 'Assigning...' : 'Assign Candidate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
