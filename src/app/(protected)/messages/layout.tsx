'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../../components/layout';

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Main Content - Full width for messages */}
      <div
        className={`flex-1 transition-all duration-200 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } bg-white  overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
