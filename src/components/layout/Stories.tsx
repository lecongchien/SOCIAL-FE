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
    avatar:
      'https://i.pinimg.com/736x/72/33/4d/72334d0f7b53aa6023b519a970691fea.jpg',
    isViewed: false,
  },
  {
    id: '2',
    username: 'taylorswift',
    avatar:
      'https://i.pinimg.com/736x/76/e1/e8/76e1e8bcf9086cd27b07c48c86dc2dbb.jpg',
    isViewed: false,
  },
  {
    id: '3',
    username: 'pinkyswa...',
    avatar:
      'https://i.pinimg.com/736x/89/ec/36/89ec3697fa15da82473abf0b9791050f.jpg',
    isViewed: true,
  },
  {
    id: '4',
    username: 'ima.jewelry',
    avatar:
      'https://i.pinimg.com/736x/38/59/6d/38596db1a2ef0a933f743e227aceb5d6.jpg',
    isViewed: false,
  },
  {
    id: '5',
    username: 'lilkey01',
    avatar:
      'https://i.pinimg.com/736x/c3/d1/70/c3d1701c5ebf6b81347c478fb4b91e07.jpg',
    isViewed: true,
  },
  {
    id: '6',
    username: 'dpran',
    avatar:
      'https://i.pinimg.com/1200x/8c/54/a5/8c54a5f558558be5f3e2b625dac02f5a.jpg',
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
