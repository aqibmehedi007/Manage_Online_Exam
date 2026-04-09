'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a061d] text-white py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-400">Powered by</span>
          <div className="relative h-8 w-32">
             <Image 
               src="/logo.png" 
               alt="AKIJ Resource" 
               fill 
               className="object-contain"
             />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">Helpline</span>
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-white/10">
                <Phone className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">+88 011020202505</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full bg-white/10">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold">support@akij.work</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
