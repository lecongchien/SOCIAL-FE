'use client';

import Link from 'next/link';
import React from 'react';
import { SearchIcon } from '../common/icons';

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21s-7.5-4.873-10-8.25C-0.5 8.873 3.5 4 7.5 6.5 9 7.5 10 9 12 11c2-2 3-3.5 4.5-4.5C20.5 4 24.5 8.873 22 12.75 19.5 16.127 12 21 12 21z" />
  </svg>
);

export const TopNav: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  sm:hidden block">
      <div className="max-w-2xl mx-auto">
        <div className="h-14 flex items-center justify-between px-4 bg-white/95 dark:bg-zinc-900 backdrop-blur-sm border-b border-gray-200 dark:border-zinc-800">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" aria-label="Home" className="flex items-center">
              <span className="font-cursive text-white text-2xl font-semibold select-none">
                Viora
              </span>
              <svg
                className="w-4 h-4 ml-1 text-gray-700 dark:text-zinc-300"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 9.5L10 14l5-4.5" />
              </svg>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="flex-1 px-4">
            <label className="relative block">
              <span className="sr-only">Tìm kiếm</span>
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
              </span>
              <input
                type="search"
                placeholder="Tìm kiếm"
                className="w-full max-w-md py-2 pl-10 pr-3 rounded-md bg-gray-100/80 dark:bg-zinc-800 text-sm text-gray-800 dark:text-zinc-100 placeholder-gray-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black/20"
                aria-label="Tìm kiếm"
              />
            </label>
          </div>
          <div className="flex items-center gap-4">
            <button
              aria-label="Likes"
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
            >
              <HeartIcon className="w-6 h-6 text-gray-700 dark:text-zinc-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
