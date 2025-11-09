import React from 'react';
import { Avatar } from '../common/Avatar';

interface SuggestedUser {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isFollowing: boolean;
  mutualFriends?: number;
}

const suggestedUsers: SuggestedUser[] = [
  {
    id: '1',
    username: 'fumiyan_1122',
    name: 'Đang theo dõi minoha_m',
    avatar:
      'https://i.pinimg.com/736x/c3/d1/70/c3d1701c5ebf6b81347c478fb4b91e07.jpg',
    isFollowing: false,
  },
  {
    id: '2',
    username: 'ihn.732',
    name: 'Có nhiềm theo dõi',
    avatar:
      'https://i.pinimg.com/736x/38/59/6d/38596db1a2ef0a933f743e227aceb5d6.jpg',
    isFollowing: false,
  },
  {
    id: '3',
    username: 'dungpearrr.x.x',
    name: 'Gợi ý cho bạn',
    avatar:
      'https://i.pinimg.com/1200x/8c/54/a5/8c54a5f558558be5f3e2b625dac02f5a.jpg',
    isFollowing: false,
  },
  {
    id: '4',
    username: 'hynrose',
    name: 'Có _miniboo512 theo dõi',
    avatar:
      'https://i.pinimg.com/736x/89/ec/36/89ec3697fa15da82473abf0b9791050f.jpg',
    isFollowing: false,
  },
  {
    id: '5',
    username: 'pmkhoa_z',
    name: 'Gợi ý cho bạn',
    avatar:
      'https://i.pinimg.com/736x/76/e1/e8/76e1e8bcf9086cd27b07c48c86dc2dbb.jpg',
    isFollowing: false,
  },
];

const currentUser = {
  username: 'chisaln',
  name: 'chisaln',
  avatar:
    'https://i.pinimg.com/736x/72/33/4d/72334d0f7b53aa6023b519a970691fea.jpg',
};

export const SuggestionsPanel: React.FC = () => {
  return (
    <div className="w-80 xl:w-96 fixed xl:pl-0 pl-4 md:block hidden right-4 xl:right-8 top-0 h-screen py-8 overflow-y-auto">
      <div className="space-y-6 ml-2">
        {/* Current User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.username}
              size="md"
              className="w-14 h-14"
            />
            <div>
              <p className="font-semibold text-sm text-gray-900">
                {currentUser.username}
              </p>
              <p className="text-sm text-gray-500">{currentUser.name}</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-blue-500 hover:text-blue-700">
            Chuyển
          </button>
        </div>

        {/* Suggestions Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">Gợi ý cho bạn</p>
          <button className="text-xs font-semibold text-gray-900 hover:text-gray-700">
            Xem tất cả
          </button>
        </div>

        {/* Suggested Users */}
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  size="sm"
                  className="w-8 h-8"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.name}</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 flex-shrink-0">
                Theo dõi
              </button>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="space-y-4 pt-8">
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex flex-wrap gap-x-1">
              <span>Giới thiệu</span>
              <span>•</span>
              <span>Trợ giúp</span>
              <span>•</span>
              <span>Báo chí</span>
              <span>•</span>
              <span>API</span>
              <span>•</span>
              <span>Việc làm</span>
            </div>
            <div className="flex flex-wrap gap-x-1">
              <span>Quyền riêng tư</span>
              <span>•</span>
              <span>Điều khoản</span>
              <span>•</span>
              <span>Vị trí</span>
              <span>•</span>
              <span>Ngôn ngữ</span>
            </div>
            <div className="flex flex-wrap gap-x-1">
              <span>Meta đã xác minh</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            © 2023 Viora FROM META
          </div>
        </div>
      </div>
    </div>
  );
};
