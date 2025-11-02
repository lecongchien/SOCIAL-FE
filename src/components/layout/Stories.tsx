'use client';

import { memo } from 'react';
import { Avatar } from '../common/Avatar';

interface Story {
  id: string;
  username: string;
  avatar: string;
  isViewed: boolean;
}

const stories: Story[] = [
  {
    id: '1',
    username: '_miniboo...',
    avatar: '',
    isViewed: false,
  },
  {
    id: '2',
    username: 'taylorswift',
    avatar: '',
    isViewed: false,
  },
  {
    id: '3',
    username: 'pinkyswa...',
    avatar: '',
    isViewed: true,
  },
  {
    id: '4',
    username: 'ima.jewelry',
    avatar: '',
    isViewed: false,
  },
  {
    id: '5',
    username: 'lilkey01',
    avatar: '',
    isViewed: true,
  },
  {
    id: '6',
    username: 'dpran',
    avatar: '',
    isViewed: false,
  },
];

export const Stories = memo(() => {
  return (
    <div className="bg-white  border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 text-center">
            <div
              className={`p-0.5 rounded-full ${
                story.isViewed
                  ? 'bg-gray-300'
                  : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
              }`}
            >
              <div className="bg-white  p-0.5 rounded-full">
                <Avatar
                  src={story.avatar}
                  alt={story.username}
                  size="md"
                  className="w-14 h-14"
                />
              </div>
            </div>
            <p className="text-xs text-gray-900 mt-1 max-w-[60px] truncate">
              {story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

Stories.displayName = 'Stories';
