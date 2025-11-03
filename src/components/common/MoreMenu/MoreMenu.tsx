'use client';

import { useDarkMode } from '@/hooks/useDarkMode';
import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import React from 'react';
import { MenuIcon } from '../icons';

interface MoreMenuProps {
  isCollapsed?: boolean;
  notText?: boolean;
}

export const MoreMenu: React.FC<MoreMenuProps> = ({
  isCollapsed = false,
  notText = false,
}) => {
  const { toggleDark } = useDarkMode();

  const iconClass = `w-6 h-6 ${
    !notText ? 'text-gray-700 group-hover:text-black' : 'text-white'
  }`;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex cursor-pointer items-center w-full px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group">
          <MenuIcon className={iconClass} />
          {!isCollapsed && !notText && (
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
          <Link
            href="/settings"
            className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors"
          >
            <span>⚙️</span>
            <span>Cài đặt</span>
          </Link>

          <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
            <span>📊</span>
            <span>Hoạt động của bạn</span>
          </button>

          <button className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors">
            <span>🔖</span>
            <span>Đã lưu</span>
          </button>

          <button
            className="flex cursor-pointer text-gray-700 items-center gap-2 px-4 py-2 rounded hover:bg-gray-100 hover:text-black transition-colors"
            onClick={toggleDark}
            type="button"
          >
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
  );
};
