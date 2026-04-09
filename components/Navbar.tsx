'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  userEmail?: string;
  userName?: string;
  pageTitle?: string;
}

export default function Navbar({ userEmail, userName, pageTitle = 'Dashboard' }: NavbarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/auth/login');
  };

  const displayName = userName || userEmail?.split('@')[0] || 'User';

  return (
    <>
      <nav className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-100 bg-white px-8">
        <div className="flex w-full items-center justify-between mx-auto max-w-[1440px]">
          {/* Left: Logo + Page Title */}
          <div className="flex items-center gap-6">
            <div
              className="relative h-9 w-32 cursor-pointer shrink-0"
              onClick={() => (window.location.href = '/')}
            >
              <Image src="/logo.png" alt="AKIJ Resource" fill className="object-contain object-left" />
            </div>
            <span className="text-sm font-medium text-[#475569]">{pageTitle}</span>
          </div>

          {/* Right: Avatar + Name + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
                <Image src="/avatar.png" alt="Profile" fill className="object-cover" />
              </div>
              <div className="hidden xl:block text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[#1e293b] group-hover:text-primary transition-colors">
                    {displayName}
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-xs text-gray-400">Ref. ID - 16101121</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#1e293b] truncate">{displayName}</p>
                  <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                </div>
                <button
                  onClick={() => { setDropdownOpen(false); setConfirmOpen(true); }}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sign Out Confirmation Dialog */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-bold text-[#1e293b] mb-2">Sign Out</h3>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out? You will need to log in again to access your account.</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-5 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
