'use client';

import React from 'react';
import Image from 'next/image';
import { Bell, Search, ChevronDown, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  userName?: string;
}

export default function Navbar({ userEmail, userName }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center border-b border-border bg-white px-8 shadow-sm">
      <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
        <div className="flex items-center">
          <div className="relative h-10 w-36 cursor-pointer" onClick={() => (window.location.href = '/')}>
            <Image 
              src="/logo.png" 
              alt="AKIJ Resource" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-200 mx-8"></div>
          <span className="text-sm font-semibold text-[#4b5563]">Dashboard</span>
        </div>

        <div className="flex items-center space-x-8">
          <button className="relative text-[#6b7280] hover:text-primary transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white ring-2 ring-white">
              2
            </span>
          </button>

          <div className="flex items-center space-x-4 border-l border-slate-100 pl-8">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
              <Image 
                src="/avatar.png" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="hidden text-left xl:block cursor-pointer group">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {userName || userEmail?.split('@')[0] || 'Arif Hossain'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[11px] font-medium text-slate-400">Ref. ID - 16101121</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
