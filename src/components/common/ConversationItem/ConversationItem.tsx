import { cn } from '@/lib/utils';
import React from 'react';
import { Conversation } from '../../../../types/message';
import { User } from '../../../../types/user';
import { Avatar } from '../Avatar';

export interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  participants: User[];
  isActive?: boolean;
  onClick?: (conversationId: string) => void;
  className?: string;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
  participants,
  isActive = false,
  onClick,
  className,
}) => {
  // Lấy thông tin người chat (không phải current user)
  const otherParticipant = participants.find(p => p.id !== currentUserId);
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (days === 1) {
      return 'Hôm qua';
    } else if (days < 7) {
      return `${days} ngày`;
    } else {
      return date.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  const getLastMessagePreview = () => {
    if (!conversation.lastMessage) return 'Bắt đầu cuộc trò chuyện';
    
    const { content, type, senderId } = conversation.lastMessage;
    const senderName = senderId === currentUserId ? 'Bạn' : otherParticipant?.username || 'Unknown';
    
    switch (type) {
      case 'image':
        return `${senderName}: Đã gửi một ảnh`;
      case 'video':
        return `${senderName}: Đã gửi một video`;
      case 'audio':
        return `${senderName}: Đã gửi một tin nhắn thoại`;
      case 'file':
        return `${senderName}: Đã gửi một tệp`;
      default:
        return `${senderName}: ${content}`;
    }
  };

  return (
    <div
      className={cn(
        'flex items-center p-3 cursor-pointer transition-all duration-200',
        'hover:bg-gray-50 border-b border-gray-100 last:border-b-0',
        isActive && 'bg-blue-50 border-l-4 border-l-blue-500',
        className
      )}
      onClick={() => onClick?.(conversation.id)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar
          src={conversation.isGroup ? conversation.groupAvatar : otherParticipant?.avatarUrl}
          alt={conversation.isGroup ? conversation.groupName : otherParticipant?.fullName || otherParticipant?.username}
          size="md"
          fallback={conversation.isGroup ? 
            conversation.groupName?.charAt(0).toUpperCase() : 
            otherParticipant?.fullName?.charAt(0).toUpperCase() || otherParticipant?.username?.charAt(0).toUpperCase()
          }
        />
        {/* Online status indicator */}
        {!conversation.isGroup && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            'font-medium truncate text-sm',
            conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
          )}>
            {conversation.isGroup ? 
              conversation.groupName : 
              otherParticipant?.fullName || otherParticipant?.username || 'Unknown User'
            }
          </h3>
          <div className="flex items-center gap-1">
            {conversation.lastMessage && (
              <span className="text-xs text-gray-500">
                {formatTime(conversation.lastMessageAt)}
              </span>
            )}
            {conversation.unreadCount > 0 && (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </div>
            )}
          </div>
        </div>
        
        <p className={cn(
          'text-sm truncate mt-0.5',
          conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
        )}>
          {getLastMessagePreview()}
        </p>
      </div>
    </div>
  );
};
