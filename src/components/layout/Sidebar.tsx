'use client';

import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar } from '../common/Avatar';
import {
  CreateIcon,
  ExploreIcon,
  HomeIcon,
  MenuIcon,
  MessagesIcon,
  NotificationsIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
} from '../common/icons';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navigation: NavigationItem[] = [
  {
    name: 'Trang chủ',
    href: '/home',
    icon: HomeIcon,
    label: 'Home',
  },
  {
    name: 'Tìm kiếm',
    href: '/search',
    icon: SearchIcon,
    label: 'Search',
  },
  {
    name: 'Khám phá',
    href: '/explore',
    icon: ExploreIcon,
    label: 'Explore',
  },
  {
    name: 'Reels',
    href: '/reels',
    icon: ReelsIcon,
    label: 'Reels',
  },
  {
    name: 'Tin nhắn',
    href: '/messages',
    icon: MessagesIcon,
    label: 'Messages',
  },
  {
    name: 'Thông báo',
    href: '/notifications',
    icon: NotificationsIcon,
    label: 'Notifications',
  },
  {
    name: 'Tạo',
    href: '/create',
    icon: CreateIcon,
    label: 'Create',
  },
  {
    name: 'Trang cá nhân',
    href: '/user',
    icon: ProfileIcon,
    label: 'Profile',
  },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-200 z-40 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <Link href="/home" className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            {!isCollapsed ? (
              <h1 className="text-2xl font-bold text-black">Instagram</h1>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
            )}
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group ${
                      isActive ? 'bg-gray-100 font-semibold' : ''
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'text-black' : 'text-gray-700'
                      } group-hover:text-black`}
                    />
                    {!isCollapsed && (
                      <span
                        className={`ml-3 text-base ${
                          isActive
                            ? 'font-semibold text-black'
                            : 'text-gray-700'
                        } group-hover:text-black`}
                      >
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-3">
          <Link
            href="/user"
            className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
          >
            <Avatar src="" alt="Profile" size="sm" className="w-6 h-6" />
            {!isCollapsed && (
              <span className="ml-3 text-base text-gray-700 group-hover:text-black">
                Trang cá nhân
              </span>
            )}
          </Link>
        </div>

        {/* More Menu */}
        <div className="p-3">
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="flex cursor-pointer items-center w-full px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group">
                <MenuIcon className="w-6 h-6 text-gray-700 group-hover:text-black" />
                {!isCollapsed && (
                  <span className="ml-3 text-base text-gray-700 group-hover:text-black">
                    Xem thêm
                  </span>
                )}
              </button>
            </Popover.Trigger>
            <Popover.Content
              side="top"
              align="center"
              className="bg-white rounded-xl shadow-lg p-2 w-64"
            >
              <div className="flex flex-col gap-1">
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>⚙️</span>
                  <span>Cài đặt</span>
                </button>
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>📊</span>
                  <span>Hoạt động của bạn</span>
                </button>
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>🔖</span>
                  <span>Đã lưu</span>
                </button>
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>🌙</span>
                  <span>Chuyển chế độ</span>
                </button>
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>💬</span>
                  <span>Báo cáo sự cố</span>
                </button>
                <hr className="my-2" />
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
                  <span>🔄</span>
                  <span>Chuyển tài khoản</span>
                </button>
                <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-red-500 transition-colors">
                  <span>🚪</span>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </div>
  );
};
