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
  LayoutDashboard
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
    <div className="flex h-[80vh] items-center justify-center">
      <div className="h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!data) return <div>Error loading data</div>;

  const { metrics, activity, dbHealth } = data;

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 pb-20 p-8">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extra-bold text-[#1e293b] flex items-center gap-3">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            System Control Center
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Real-time platform-wide monitoring and system health logs.</p>
        </div>
        <div className="hidden md:flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
           <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">SA</div>
           <div className="pr-4">
             <p className="text-sm font-bold text-[#1e293b]">Super Admin</p>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">System God Mode</p>
           </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-[2rem] text-white shadow-xl shadow-indigo-200">
           <div className="flex items-center justify-between mb-4">
             <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
               <Users className="h-6 w-6" />
             </div>
             <TrendingUp className="h-5 w-5 opacity-50" />
           </div>
           <p className="text-indigo-100 text-sm font-medium">Total Platform Users</p>
           <h3 className="text-4xl font-black mt-1">{metrics.users.total}</h3>
           <div className="mt-4 flex gap-2">
             <span className="text-[10px] bg-white/20 px-2 py-1 rounded-lg font-bold">CANDIDATES: {metrics.users.candidates}</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
           <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
             <BookOpen className="h-6 w-6" />
           </div>
           <p className="text-gray-400 text-sm font-bold">Active Exams</p>
           <h3 className="text-3xl font-black text-[#1e293b] mt-1">{metrics.exams.total}</h3>
           <p className="text-[10px] text-emerald-500 font-black mt-2 uppercase tracking-widest">Across all employers</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
           <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
             <ShieldCheck className="h-6 w-6" />
           </div>
           <p className="text-gray-400 text-sm font-bold">Integrity Score</p>
           <h3 className="text-3xl font-black text-[#1e293b] mt-1">{(100 - (metrics.integrity.cheatingRate * 10)).toFixed(1)}%</h3>
           <p className="text-[10px] text-amber-500 font-black mt-2 uppercase tracking-widest">{metrics.integrity.tabSwitches} platform-wide switches</p>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-[2rem] text-white shadow-xl shadow-gray-200">
           <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
             <Zap className="h-6 w-6 text-amber-400" />
           </div>
           <p className="text-gray-400 text-sm font-bold">Global Performance</p>
           <h3 className="text-3xl font-black mt-1">{metrics.performance.avgScore}%</h3>
           <p className="text-[10px] text-gray-500 font-black mt-2 uppercase tracking-widest">Avg Candidate Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-[#1e293b] flex items-center gap-3">
                  <Activity className="h-6 w-6 text-primary" />
                  Recent Platform Activity
                </h2>
                <button className="text-xs font-bold text-primary px-4 py-2 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">View All Logs</button>
              </div>

              <div className="space-y-6">
                 {activity.submissions.map((sub: any) => (
                   <div key={sub.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-primary font-bold">
                           {sub.user.name.charAt(0)}
                         </div>
                         <div>
                            <p className="text-sm font-black text-[#1e293b]">{sub.user.name}</p>
                            <p className="text-[11px] text-gray-400 font-medium">Completed <span className="font-bold text-gray-600">{sub.exam.title}</span></p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase">SCORE: {sub.score}%</span>
                         <p className="text-[10px] text-gray-300 mt-1 uppercase font-bold tracking-tighter">Just now</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-[#1e293b] flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-emerald-500" />
                  Newly Launched Exams
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {activity.exams.map((exam: any) => (
                   <div key={exam.id} className="p-5 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-emerald-500/30 transition-all">
                      <h4 className="font-black text-[#1e293b] text-sm group-hover:text-emerald-600 transition-colors">{exam.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">CREATED BY: {exam.employer.name}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* System Health */}
        <div className="space-y-8">
           <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black text-[#1e293b] flex items-center gap-3 mb-8">
                <Database className="h-6 w-6 text-amber-500" />
                Database Vitals
              </h2>
              <div className="space-y-5">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <span className="text-sm font-bold text-gray-500">Exams</span>
                    <span className="font-black text-gray-700">{metrics.exams.total}</span>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <span className="text-sm font-bold text-gray-500">Questions</span>
                    <span className="font-black text-gray-700">{dbHealth.questions}</span>
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <span className="text-sm font-bold text-gray-500">Options</span>
                    <span className="font-black text-gray-700">{dbHealth.options}</span>
                 </div>
              </div>
              <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">All Systems Operational</span>
              </div>
           </div>

           <div className="bg-gradient-to-tr from-[#1e293b] to-gray-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-indigo-400" />
                  Admin Security
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-6">Your session is highly encrypted. All administrative actions are logged in the immutable audit trail.</p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Audit Logs</button>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-white/5 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
}
