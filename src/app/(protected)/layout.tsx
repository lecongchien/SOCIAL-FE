'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  FloatingNav,
  MobileNav,
  Sidebar,
  SuggestionsPanel,
} from '../../components/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Check if current route is messages
  const isMessagesRoute = pathname?.startsWith('/messages');

  if (isMessagesRoute) {
    // For messages route, use full layout without restrictions
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Main Content */}
      <div
        className={`transition-all duration-200 ${
          isSidebarCollapsed ? 'ml-16' : 'sm:ml-20 md:ml-64'
        } lg:mr-80 xl:mr-96 min-h-screen`}
      >
        <main className="max-w-2xl mx-auto py-8 px-4">{children}</main>
      </div>
      {/* Suggestions Panel - Hidden on smaller screens */}
      <div className="hidden lg:block">
        <SuggestionsPanel />
      </div>

      {/* Mobile bottom navigation (visible on small screens) */}
      <MobileNav />
      {/* Floating nav (slim left + messages pill) visible on large screens */}
      <FloatingNav />
    </div>
  );
}
