import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Message } from '../../../../types/message';
import { User } from '../../../../types/user';
import { Avatar } from '../Avatar';

export interface MessageItemProps {
  message: Message;
  sender: User;
  currentUserId: string;
  isGroupChat?: boolean;
  showAvatar?: boolean;
  showTime?: boolean;
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, reaction: string) => void;
  className?: string;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  sender,
  currentUserId,
  isGroupChat = false,
  showAvatar = true,
  showTime = true,
  onReply,
  onReact,
  className,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const isOwn = message.senderId === currentUserId;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="relative">
            <img
              src={message.mediaUrl}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                /* TODO: Open image modal */
              }}
            />
          </div>
        );

      case 'video':
        return (
          <div className="relative max-w-xs">
            <video
              src={message.mediaUrl}
              controls
              className="rounded-lg w-full"
            />
          </div>
        );

      case 'audio':
        return (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 max-w-xs">
            <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
              ▶
            </button>
            <div className="flex-1 h-1 bg-gray-300 rounded-full">
              <div className="h-1 bg-blue-500 rounded-full w-1/3"></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">0:30</span>
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-xs cursor-pointer hover:bg-gray-200 transition-colors">
            <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center mr-2">
              📄
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Document.pdf</p>
              <p className="text-xs text-gray-500">2.4 MB</p>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={cn(
              'px-4 py-2 rounded-2xl max-w-xs lg:max-w-md break-words',
              isOwn
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-900 border border-gray-200'
            )}
          >
            {message.content}
          </div>
        );
    }
  };

  const renderMessageStatus = () => {
    if (!isOwn) return null;

    return (
      <div className="flex items-center text-xs text-gray-400 mt-1">
        {message.isRead ? (
          <span className="text-blue-500">✓✓</span>
        ) : message.isDelivered ? (
          <span>✓✓</span>
        ) : (
          <span>✓</span>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex items-end gap-2 mb-4 group',
        isOwn ? 'justify-end' : 'justify-start',
        className
      )}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Avatar cho người gửi (chỉ hiện với tin nhắn của người khác trong group chat) */}
      {!isOwn && isGroupChat && showAvatar && (
        <Avatar
          src={sender.avatarUrl}
          alt={sender.fullName || sender.username}
          size="sm"
          fallback={
            sender.fullName?.charAt(0).toUpperCase() ||
            sender.username.charAt(0).toUpperCase()
          }
        />
      )}

      <div className={cn('flex flex-col', isOwn ? 'items-end' : 'items-start')}>
        {/* Tên người gửi trong group chat */}
        {!isOwn && isGroupChat && (
          <span className="text-xs text-gray-500 mb-1 px-1">
            {sender.fullName || sender.username}
          </span>
        )}

        {/* Nội dung tin nhắn */}
        <div className="relative">
          {renderMessageContent()}

          {/* Message options */}
          {showOptions && (
            <div
              className={cn(
                'absolute top-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity',
                isOwn ? '-left-20' : '-right-20'
              )}
            >
              <button
                onClick={() => onReply?.(message.id)}
                className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700"
                title="Reply"
              >
                ↩
              </button>
              <button
                onClick={() => onReact?.(message.id, '❤️')}
                className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-700"
                title="React"
              >
                ❤️
              </button>
            </div>
          )}
        </div>

        {/* Thời gian và trạng thái */}
        <div className="flex items-center gap-1 mt-1">
          {showTime && (
            <span className="text-xs text-gray-400">
              {formatTime(message.createdAt)}
            </span>
          )}
          {renderMessageStatus()}
        </div>
      </div>
    </div>
  );
};
