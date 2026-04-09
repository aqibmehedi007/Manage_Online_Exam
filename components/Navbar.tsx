'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  userEmail?: string;
  userName?: string;
  pageTitle?: string;
}

export default function Navbar({ userEmail, userName, pageTitle = 'Dashboard' }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-100 bg-white px-8">
      <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
        {/* Left: Logo + Page Title */}
        <div className="flex items-center gap-6">
          <div className="relative h-9 w-32 cursor-pointer" onClick={() => (window.location.href = '/')}>
            <Image
              src="/logo.png"
              alt="AKIJ Resource"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-[#475569]">{pageTitle}</span>
        </div>

        {/* Right: Avatar + Name */}
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
            <Image
              src="/avatar.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden xl:block text-right">
            <div className="flex items-center gap-1.5 cursor-pointer group">
              <span className="text-sm font-semibold text-[#1e293b] group-hover:text-primary transition-colors">
                {userName || userEmail?.split('@')[0] || 'Arif Hossain'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-gray-400">Ref. ID - 16101121</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
