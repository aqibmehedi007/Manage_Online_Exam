'use client';

import React, { useState } from 'react';
import { X, User, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCandidateModal({ isOpen, onClose, onSuccess }: AddCandidateModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123'); // Default password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/employer/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add candidate');
      }

      onSuccess();
      onClose();
      // Clean up
      setName('');
      setEmail('');
      setPassword('password123');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="text-lg font-bold text-[#1e293b]">Add New Candidate</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
           {error && (
             <div className="p-3 rounded-xl bg-red-50 text-red-500 text-xs font-medium border border-red-100 italic">
               * {error}
             </div>
           )}

           <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Candidate Name</label>
               <div className="relative">
                 <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                 <Input 
                   required
                   placeholder="e.g. Mehedi Hasan" 
                   className="pl-10 h-11 border-gray-100 bg-[#f8fafc] rounded-xl"
                   value={name}
                   onChange={e => setName(e.target.value)}
                 />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                 <Input 
                   required
                   type="email"
                   placeholder="mehedi@example.com" 
                   className="pl-10 h-11 border-gray-100 bg-[#f8fafc] rounded-xl"
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                 />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Temporary Password</label>
               <div className="relative">
                 <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                 <Input 
                   required
                   placeholder="Minimum 6 characters" 
                   className="pl-10 h-11 border-gray-100 bg-[#f8fafc] rounded-xl"
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                 />
               </div>
               <p className="text-[10px] text-gray-400 mt-2 italic px-1">Share this password with the candidate for their first login.</p>
             </div>
           </div>

           <div className="pt-4 flex gap-3">
             <Button 
               type="button" 
               onClick={onClose}
               className="flex-1 h-11 bg-gray-50 text-[#64748b] hover:bg-gray-100 font-bold rounded-xl"
             >
               Cancel
             </Button>
             <Button 
               type="submit" 
               disabled={loading}
               className="flex-1 h-11 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20"
             >
               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Candidate'}
             </Button>
           </div>
        </form>
      </div>
    </div>
  );
}
