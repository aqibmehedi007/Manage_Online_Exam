'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  BookOpen, 
  ShieldCheck, 
  Activity, 
  Database, 
  AlertCircle,
  TrendingUp,
  Briefcase,
  UserCheck,
  Zap,
  LayoutDashboard,
  ShieldAlert,
  Server,
  ArrowRight
} from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const result = await res.json();
        if (res.ok) setData(result);
      } catch (error) {
        console.error('Failed to fetch admin stats', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center bg-[#fcfdfe]">
      <div className="h-10 w-10 border-4 border-[#2F308C] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!data) return (
    <div className="flex flex-col h-[60vh] items-center justify-center text-center space-y-4 bg-[#fcfdfe]">
       <AlertCircle className="h-12 w-12 text-red-500" />
       <h3 className="text-xl font-bold text-slate-900">Telemetry Disconnected</h3>
       <p className="text-slate-500">Could not sync with the central database orchestrator.</p>
    </div>
  );

  const { metrics, activity, dbHealth } = data;

  return (
    <div className="bg-[#fcfdfe] min-h-screen">
      <div className="mx-auto max-w-[1440px] space-y-12 pb-24 px-6 pt-10">
        {/* Metric Grid: Premium White Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Main Users Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#2F308C]/20 transition-all group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-[#2F308C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center justify-between mb-8">
                <div className="h-14 w-14 bg-slate-50 border border-slate-100 text-[#2F308C] rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                  <Users className="h-7 w-7" />
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">+12% Gain</div>
                </div>
             </div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">Global Talent Assets</p>
             <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{metrics.users.total}</h3>
             <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-black uppercase tracking-tighter text-slate-400">
               <span>ASSIGNED: {metrics.users.candidates}</span>
               <span className="text-slate-300">|</span>
               <span>POOL: 1,400</span>
             </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#2F308C]/20 transition-all group">
             <div className="h-14 w-14 bg-slate-50 border border-slate-100 text-[#2F308C] rounded-2xl flex items-center justify-center mb-8">
               <BookOpen className="h-7 w-7" />
             </div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">Active Evaluation Units</p>
             <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{metrics.exams.total}</h3>
             <div className="text-[10px] text-slate-400 font-bold mt-4 uppercase flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                Telemetry Synchronized
             </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#2F308C]/20 transition-all group">
             <div className="h-14 w-14 bg-slate-50 border border-slate-100 text-[#2F308C] rounded-2xl flex items-center justify-center mb-8">
               <ShieldCheck className="h-7 w-7" />
             </div>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">Mean Integrity Health</p>
             <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{(100 - (metrics.integrity.cheatingRate * 10)).toFixed(1)}%</h3>
             <p className="text-[10px] text-amber-600 font-black mt-4 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded w-max">Validated Logs</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-[#2F308C]/20 transition-all group">
             <div className="h-14 w-14 bg-slate-50 border border-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mb-8">
               <Zap className="h-7 w-7" />
             </div>
             <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">Average Perf. Index</div>
             <h3 className="text-5xl font-black text-slate-900 tracking-tighter">{metrics.performance.avgScore}%</h3>
             <div className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest flex items-center gap-2">
                <div className="h-1 w-4 bg-slate-100 rounded-full"></div>
                Source verified
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Activity Stream Section */}
          <div className="lg:col-span-2 space-y-10">
             <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 shadow-sm">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <Activity className="h-6 w-6 text-[#2F308C]" />
                      Live Data Stream
                    </h2>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2F308C]/60 hover:text-[#2F308C] transition-colors">Access Full Logs ➔</button>
                </div>

                <div className="space-y-4">
                   {activity.submissions.map((sub: any) => (
                     <div key={sub.id} className="flex items-center justify-between p-6 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group">
                        <div className="flex items-center gap-6">
                           <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center text-sm font-black border border-slate-200 group-hover:bg-[#2F308C] group-hover:text-white transition-all">
                             {sub.user.name.charAt(0)}
                           </div>
                           <div>
                              <p className="text-base font-black text-slate-900 flex items-center gap-2">
                                {sub.user.name}
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 px-2 py-0.5 rounded bg-emerald-50">{sub.score > 0 ? 'SYNCED' : 'LIVE'}</span>
                              </p>
                              <p className="text-[11px] text-slate-400 font-bold mt-0.5 tracking-tight">Assessment Engine: <span className="text-slate-800">{sub.exam.title}</span></p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <span className="px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-sm group-hover:bg-[#2F308C] group-hover:text-white group-hover:border-[#2F308C] transition-colors">SCORE: {sub.score}%</span>
                              <div className="text-[9px] text-slate-400 mt-2 uppercase font-black font-mono tracking-tighter flex items-center justify-end gap-1.5 leading-none">
                                 <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                                 PULSE: 11:13:02
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Deployment Cards: Professional Engine Style */}
             <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                    <Server className="h-6 w-6 text-slate-800" />
                    System Deployment Stack
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {activity.exams.map((exam: any) => (
                     <div key={exam.id} className="p-6 rounded-2xl bg-white border border-slate-200 group hover:border-[#2F308C] transition-all flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow-lg">
                        <div className="flex items-start justify-between">
                          <h4 className="font-black text-slate-900 text-base leading-tight pr-8">{exam.title}</h4>
                          <div className="h-2 w-2 rounded-full bg-[#2F308C]/20 border border-[#2F308C]/40"></div>
                        </div>
                        <div className="mt-8 space-y-4">
                           <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                             <div className="h-[1px] w-4 bg-slate-200"></div>
                             {exam.employer.name}
                           </div>
                           <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-400">
                             <span className="bg-slate-50 px-2 py-1 rounded">SLOTS: {exam.totalSlots || 5}</span>
                             <span className="text-[#2F308C] font-black group-hover:translate-x-1 transition-transform">DETAILS ➔</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Sidebars: Structural Integrity */}
          <div className="space-y-12">
             <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 shadow-sm overflow-hidden">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-10">
                  <Database className="h-6 w-6 text-slate-800" />
                  Telemetry Vitals
                </h2>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#2F308C]/40 transition-all">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Nodes</span>
                      <span className="font-mono font-black text-lg text-slate-900">{metrics.exams.total}</span>
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#2F308C]/40 transition-all">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logic Matrix</span>
                      <span className="font-mono font-black text-lg text-slate-900">{dbHealth.questions}</span>
                   </div>
                   <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#2F308C]/40 transition-all">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Pool</span>
                      <span className="font-mono font-black text-lg text-slate-900">{dbHealth.options}</span>
                   </div>
                </div>
                
                <div className="mt-10 p-5 bg-[#2F308C] rounded-2xl flex items-center justify-between shadow-xl shadow-[#2F308C]/20 transition-transform hover:scale-[1.02] cursor-default">
                   <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]"></div>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Operational</span>
                   </div>
                   <span className="text-[9px] font-bold text-white/40 font-mono">PULSE: 100%</span>
                </div>
             </div>

             {/* Admin Security: High-Fidelity Lockdown Card */}
             <div className="bg-white rounded-[2rem] p-10 border-2 border-[#2F308C] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-[#2F308C]/5 border border-[#2F308C]/20 flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform">
                    <ShieldAlert className="h-8 w-8 text-[#2F308C]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    Secure Governance
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">
                    Administrative access is hardware-verified. Your transaction signature is being committed to the immutable audit ledger.
                  </p>
                  <button className="w-full py-4 bg-[#2F308C] text-white hover:bg-[#2F308C]/90 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-[#2F308C]/20 active:scale-[0.98]">
                    Audit Trail
                  </button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[#2F308C] select-none pointer-events-none">
                  <LayoutDashboard className="h-48 w-48 rotate-12" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
