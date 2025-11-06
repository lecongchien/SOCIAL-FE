import { cn } from '@/libs/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Conversation, Message } from '../../../../types/message';
import { User } from '../../../../types/user';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { MessageInput } from '../MessageInput';
import { MessageItem } from '../MessageItem';

export interface ChatWindowProps {
  conversation: Conversation | null;
  currentUser: User;
  messages: Message[];
  participants: User[];
  onSendMessage: (
    content: string,
    type: 'text' | 'image' | 'video' | 'audio' | 'file',
    file?: File
  ) => void;
  onBack?: () => void;
  className?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUser,
  messages,
  participants,
  onSendMessage,
  onBack,
  className,
}) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div
        className={cn(
          'flex-1 flex items-center justify-center bg-gray-50',
          className
        )}
      >
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            💬
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chọn một cuộc trò chuyện
          </h3>
          <p className="text-gray-500">
            Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu nhắn tin
          </p>
        </div>
      </div>
    );
  }

  const otherParticipant = participants.find((p) => p.id !== currentUser.id);

  const handleTyping = (isTyping: boolean) => {
    // TODO: Implement typing indicator logic
    console.log('User is typing:', isTyping);
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const dateKey = message.createdAt.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return Object.entries(groups).map(([date, msgs]) => ({
      date: new Date(date),
      messages: msgs,
    }));
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua';
    } else {
      return date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-white  overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white  flex-shrink-0 z-10">
        {/* Back button cho mobile */}
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-2 md:hidden"
          >
            ←
          </Button>
        )}

        {/* Avatar và thông tin */}
        <div className="flex items-center flex-1 min-w-0">
          <Avatar
            src={
              conversation.isGroup
                ? conversation.groupAvatar
                : otherParticipant?.avatarUrl
            }
            alt={
              conversation.isGroup
                ? conversation.groupName
                : otherParticipant?.fullName || otherParticipant?.username
            }
            size="md"
            fallback={
              conversation.isGroup
                ? conversation.groupName?.charAt(0).toUpperCase()
                : otherParticipant?.fullName?.charAt(0).toUpperCase() ||
                  otherParticipant?.username?.charAt(0).toUpperCase()
            }
          />
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">
              {conversation.isGroup
                ? conversation.groupName
                : otherParticipant?.fullName ||
                  otherParticipant?.username ||
                  'Unknown User'}
            </h3>
            <p className="text-sm text-gray-500">
              {conversation.isGroup
                ? `${participants.length} thành viên`
                : 'Đang hoạt động'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            📞
          </Button>
          <Button variant="ghost" size="sm">
            📹
          </Button>
          <Button variant="ghost" size="sm">
            ℹ️
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0 bg-gray-50">
        <div className="space-y-4">
          {messageGroups.map(({ date, messages: dayMessages }) => (
            <div key={date.toISOString()}>
              {/* Date separator */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {formatDateHeader(date)}
                </div>
              </div>

              {/* Messages for this date */}
              {dayMessages.map((message, index) => {
                const sender =
                  participants.find((p) => p.id === message.senderId) ||
                  currentUser;
                const showAvatar =
                  conversation.isGroup &&
                  message.senderId !== currentUser.id &&
                  (index === dayMessages.length - 1 ||
                    dayMessages[index + 1]?.senderId !== message.senderId);

                return (
                  <MessageItem
                    key={message.id}
                    message={message}
                    sender={sender}
                    currentUserId={currentUser.id}
                    isGroupChat={conversation.isGroup}
                    showAvatar={showAvatar}
                  />
                );
              })}
            </div>
          ))}

          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
              <span>
                {typingUsers.length === 1
                  ? `${typingUsers[0]} đang nhập...`
                  : `${typingUsers.length} người đang nhập...`}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="flex-shrink-0">
        <MessageInput
          onSend={onSendMessage}
          onTyping={handleTyping}
          placeholder={`Nhắn tin với ${
            conversation.isGroup
              ? conversation.groupName
              : otherParticipant?.username || 'người này'
          }...`}
        />
      </div>
    </div>
  );
};
