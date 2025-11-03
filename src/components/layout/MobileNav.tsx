'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  CreateIcon,
  HomeIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
} from '../common/icons';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/home', icon: HomeIcon, label: 'Home' },
  { href: '/search', icon: SearchIcon, label: 'Search' },
  { href: '/create', icon: CreateIcon, label: 'Create' },
  { href: '/reels', icon: ReelsIcon, label: 'Reels' },
  { href: '/user', icon: ProfileIcon, label: 'Profile' },
];

export const MobileNav: React.FC = () => {
  const pathname = usePathname() || '';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-zinc-800 shadow-md py-2">
          <ul className="flex items-center justify-between px-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <li key={item.href} className="flex-1">
                  <Link
                    href={item.href}
                    className="flex h-10 items-center justify-center text-center"
                    aria-label={item.label}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-gray-600 dark:text-zinc-400'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
