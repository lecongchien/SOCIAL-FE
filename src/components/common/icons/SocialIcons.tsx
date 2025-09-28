import React from 'react';

// Home Icon
export const HomeIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V19h7V7.5L12 2 2 7.5V19h7.005Z" />
    </svg>
);

// Search Icon
export const SearchIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// Explore Icon
export const ExploreIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9V3m9 9l-3-3m3 3l-3 3" />
    </svg>
);

// Reels Icon
export const ReelsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.5 1.25a.5.5 0 0 1 .5.5v8.5a1.5 1.5 0 0 1-1.5 1.5h-8.5a.5.5 0 0 1-.5-.5V2.75a.5.5 0 0 1 .5-.5h8.5a1.5 1.5 0 0 1 1.5 1.5ZM15.5 3.25H8v6.5h7.5V3.25Z" />
        <path d="M2.5 13.09a.5.5 0 0 1 .5-.5h8.5a1.5 1.5 0 0 1 1.5 1.5v8.5a.5.5 0 0 1-.5.5H3.5a1.5 1.5 0 0 1-1.5-1.5v-8.5Zm2 1.5v6.5h7.5v-6.5H4.5Z" />
    </svg>
);

// Messages Icon
export const MessagesIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

// Notifications Icon
export const NotificationsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

// Create Icon
export const CreateIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

// Profile Icon
export const ProfileIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// Menu Icon
export const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

// Instagram Logo
export const InstagramLogo = ({ className = "h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 595.28 154.24" fill="currentColor">
        <path d="M153.35,19.37h61.69v30.12c8.91-12.33,20.33-21.85,34.26-28.5,13.93-6.65,28.9-9.98,44.91-9.98,19.81,0,37.28,4.89,52.4,14.67,15.12,9.78,26.34,23.31,33.66,40.59,7.32,17.28,10.98,37.48,10.98,60.6v87.36h-61.69V136.58c0-15.72-3.46-27.85-10.39-36.39-6.93-8.54-16.71-12.81-29.34-12.81-12.63,0-22.41,4.27-29.34,12.81-6.93,8.54-10.39,20.67-10.39,36.39v77.65H153.35V19.37z" />
        <path d="M39.48,2.13c7.47-2.13,15.34-3.19,23.61-3.19,8.27,0,16.14,1.06,23.61,3.19,7.47,2.13,14.07,5.26,19.81,9.39,5.74,4.13,10.32,9.39,13.73,15.78,3.41,6.39,5.12,13.73,5.12,22.03s-1.71,15.64-5.12,22.03c-3.41,6.39-7.99,11.65-13.73,15.78-5.74,4.13-12.34,7.26-19.81,9.39-7.47,2.13-15.34,3.19-23.61,3.19-8.27,0-16.14-1.06-23.61-3.19C8.4,83.59,1.8,80.46,0,76.33V214.23h-39.48V2.13H39.48z M63.09,47.36c-5.32,0-9.78-1.92-13.38-5.76-3.6-3.84-5.4-8.74-5.4-14.7s1.8-10.86,5.4-14.7c3.6-3.84,8.06-5.76,13.38-5.76s9.78,1.92,13.38,5.76c3.6,3.84,5.4,8.74,5.4,14.7s-1.8,10.86-5.4,14.7C72.87,45.44,68.41,47.36,63.09,47.36z" />
    </svg>
);
