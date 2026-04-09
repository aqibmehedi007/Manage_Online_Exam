'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search, Filter, Mail, Calendar, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Candidate {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: string;
}

export default function CandidateListPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch('/api/employer/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error('Failed to fetch candidates');
    } finally {
      setLoading(false);
    }
  };

  const filtered = candidates.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 pb-20">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Registered Candidates</h1>
          <p className="text-sm text-gray-400 mt-1">Manage and view all candidates registered in the platform ({candidates.length})</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
          + Add New Candidate
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 h-11 border-gray-100 bg-[#f8fafc] rounded-xl focus:bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#475569] bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
             <Filter className="h-4 w-4" />
             Filters
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
             Export Data
           </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
           {[...Array(8)].map((_, i) => (
             <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
          {filtered.map((c) => (
            <div key={c.id} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col items-center text-center">
              <div className="relative h-20 w-20 rounded-full bg-gray-50 border-2 border-white shadow-md overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                <Image src={c.image || "/avatar.png"} alt={c.name} fill className="object-cover" />
              </div>
              
              <h3 className="font-bold text-[#1e293b] truncate w-full">{c.name || 'Anonymous'}</h3>
              <p className="text-xs text-gray-400 font-medium mb-5 truncate w-full">{c.email}</p>

              <div className="w-full space-y-3 pt-4 border-t border-gray-50 mt-auto">
                 <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748b]">
                    <Calendar className="h-3 w-3" />
                    Joined: {new Date(c.createdAt).toLocaleDateString()}
                 </div>
                 <div className="flex items-center justify-between gap-2 mt-4">
                    <button className="flex-1 py-2 text-[11px] font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                      View Profile
                    </button>
                    <button className="px-3 py-2 text-gray-400 hover:text-primary transition-colors">
                       <Mail className="h-4 w-4" />
                    </button>
                 </div>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
               <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-gray-300" />
               </div>
               <div>
                  <p className="text-lg font-bold text-[#1e293b]">No Candidates Found</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters to see more results.</p>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
