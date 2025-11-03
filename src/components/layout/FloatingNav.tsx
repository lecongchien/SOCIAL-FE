'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MoreMenu } from '../common';
import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  NotificationsIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
} from '../common/icons';

const leftItems = [
  { href: '/home', icon: HomeIcon, label: 'Home' },
  { href: '/search', icon: SearchIcon, label: 'Search' },
  { href: '/explore', icon: ExploreIcon, label: 'Explore' },
  { href: '/reels', icon: ReelsIcon, label: 'Reels' },
  { href: '/messages', icon: MessagesIcon, label: 'Messages' },
  { href: '/notifications', icon: NotificationsIcon, label: 'Notifications' },
  { href: '/create', icon: CreateIcon, label: 'Create' },
  { href: '/user', icon: ProfileIcon, label: 'Profile' },
];

export const FloatingNav: React.FC = () => {
  const pathname = usePathname() || '';

  return (
    <>
      {/* Slim left vertical nav - visible on large screens */}
      <aside className="sm:block md:hidden hidden  fixed left-0 top-0 h-[100vh] z-40">
        <div className="flex flex-col h-full items-center w-14 bg-black text-white  shadow-lg py-3">
          {leftItems.map((it) => {
            const Icon = it.icon;
            const active =
              pathname === it.href || pathname.startsWith(it.href + '/');

            return (
              <Link
                key={it.href}
                href={it.href}
                className={`mb-3 p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center ${
                  active ? 'bg-white/10' : ''
                }`}
                aria-label={it.label}
              >
                <Icon
                  className={`w-6 h-6 ${
                    active ? 'text-white' : 'text-zinc-300'
                  }`}
                />
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-0">
          <MoreMenu notText />
        </div>
      </aside>

      {/* Floating messages pill - bottom-right */}
      <div className="hidden lg:flex fixed right-6 bottom-8 z-50">
        <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full shadow-xl">
          <MessagesIcon className="w-5 h-5 text-white" />
          <span className="font-medium">Tin nhắn</span>
          {/* small avatar stack placeholder */}
          <div className="flex -space-x-2 ml-2">
            <div className="w-6 h-6 rounded-full bg-green-400 ring-2 ring-black" />
            <div className="w-6 h-6 rounded-full bg-yellow-400 ring-2 ring-black" />
            <div className="w-6 h-6 rounded-full bg-sky-400 ring-2 ring-black" />
          </div>
        </button>
      </div>
    </>
  );
};

export default FloatingNav;
