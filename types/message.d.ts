export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  mediaUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  isRead: boolean;
  isDelivered: boolean;
  replyTo?: string; // ID của message được reply
}

export interface Conversation {
  id: string;
  participants: string[]; // Array của user IDs
  lastMessage?: Message;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt?: Date;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  unreadCount: number;
}

export interface MessageStatus {
  messageId: string;
  userId: string;
  status: 'sent' | 'delivered' | 'read';
  timestamp: Date;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  username: string;
  isTyping: boolean;
  timestamp: Date;
}
