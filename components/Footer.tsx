'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a061d] text-white py-5 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Powered by</span>
          <div className="relative h-7 w-28">
            <Image src="/logo.png" alt="AKIJ Resource" fill className="object-contain brightness-0 invert" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span className="text-sm text-gray-400">Helpline</span>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">+88 011020202505</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">support@akij.work</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
