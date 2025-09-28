"use client";

import { Button, ChatWindow, ConversationItem, Input } from '@/components/common';
import { useEffect, useState } from 'react';
import { Conversation, Message } from '../../../../types/message';
import { User } from '../../../../types/user';

// Mock data
const mockCurrentUser: User = {
  id: 'current-user',
  username: 'chisaln',
  email: 'chisaln@example.com',
  fullName: 'Chí Saln',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'user',
  createdAt: new Date(),
  isActive: true,
};

const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'phuongthao',
    email: 'phuongthao@example.com',
    fullName: 'Phương Thảo',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: 'user-2',
    username: 'laiquynh',
    email: 'laiquynh@example.com',
    fullName: 'Lai Quỳnh Hương',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: 'user-3',
    username: 'mkhanh',
    email: 'mkhanh@example.com',
    fullName: 'M Khánh',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    createdAt: new Date(),
    isActive: true,
  },
];

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: ['current-user', 'user-1'],
    lastMessage: {
      id: 'msg-1',
      senderId: 'user-1',
      receiverId: 'current-user',
      conversationId: 'conv-1',
      content: 'Bạn đã trả lời Phương Thảo',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: false,
      isDelivered: true,
    },
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isGroup: false,
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    participants: ['current-user', 'user-2'],
    lastMessage: {
      id: 'msg-2',
      senderId: 'current-user',
      receiverId: 'user-2',
      conversationId: 'conv-2',
      content: 'Em sáng ạy',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: true,
      isDelivered: true,
    },
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isGroup: false,
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participants: ['current-user', 'user-3'],
    lastMessage: {
      id: 'msg-3',
      senderId: 'user-3',
      receiverId: 'current-user',
      conversationId: 'conv-3',
      content: 'Khó làm thì ta • 3 tuần',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
      isRead: true,
      isDelivered: true,
    },
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
    isGroup: false,
    unreadCount: 0,
  },
];

const mockMessages: { [key: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1-1',
      senderId: 'current-user',
      receiverId: 'user-1',
      conversationId: 'conv-1',
      content: 'Chào Phương Thảo!',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg-1-2',
      senderId: 'user-1',
      receiverId: 'current-user',
      conversationId: 'conv-1',
      content: 'Chào bạn! Bạn có khỏe không?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 25),
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg-1-3',
      senderId: 'current-user',
      receiverId: 'user-1',
      conversationId: 'conv-1',
      content: 'Mình khỏe, cảm ơn bạn! Bạn đang làm gì vậy?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 20),
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg-1-4',
      senderId: 'user-1',
      receiverId: 'current-user',
      conversationId: 'conv-1',
      content: 'Mình đang học React. Bạn có thể giúp mình được không?',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
      isDelivered: true,
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      senderId: 'current-user',
      receiverId: 'user-2',
      conversationId: 'conv-2',
      content: 'Chào Quỳnh Hương!',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      isRead: true,
      isDelivered: true,
    },
    {
      id: 'msg-2-2',
      senderId: 'user-2',
      receiverId: 'current-user',
      conversationId: 'conv-2',
      content: 'Em sáng ạy',
      type: 'text',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
      isDelivered: true,
    },
  ],
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = mockMessages[selectedConversation.id] || [];
      setMessages(conversationMessages);
      setShowChatWindow(true);
    }
  }, [selectedConversation]);

  const handleConversationSelect = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    setSelectedConversation(conversation || null);
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'video' | 'audio' | 'file', file?: File) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: mockCurrentUser.id,
      receiverId: selectedConversation.participants.find(p => p !== mockCurrentUser.id) || '',
      conversationId: selectedConversation.id,
      content,
      type,
      mediaUrl: file ? URL.createObjectURL(file) : undefined,
      createdAt: new Date(),
      isRead: false,
      isDelivered: true,
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation's last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMessage, lastMessageAt: new Date() }
          : conv
      )
    );
  };

  const handleBack = () => {
    setShowChatWindow(false);
    setSelectedConversation(null);
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    
    const otherParticipant = mockUsers.find(user => 
      conv.participants.includes(user.id) && user.id !== mockCurrentUser.id
    );
    
    return otherParticipant?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           otherParticipant?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.groupName?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getParticipants = (conversation: Conversation) => {
    return conversation.participants.map(id => 
      id === mockCurrentUser.id ? mockCurrentUser : mockUsers.find(u => u.id === id)
    ).filter(Boolean) as User[];
  };

  return (
    <div className="h-full flex bg-white overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className={`w-full md:w-96 md:min-w-[384px] border-r border-gray-200 flex flex-col ${
        isMobile && showChatWindow ? 'hidden' : 'flex'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Tin nhắn</h1>
            <Button variant="ghost" size="sm">
              ✏️
            </Button>
          </div>
          
          {/* Search */}
          <Input
            type="text"
            placeholder="Tìm kiếm tin nhắn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <div className="text-4xl mb-2">💬</div>
              <p>Không tìm thấy cuộc trò chuyện nào</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                currentUserId={mockCurrentUser.id}
                participants={getParticipants(conversation)}
                isActive={selectedConversation?.id === conversation.id}
                onClick={handleConversationSelect}
              />
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 min-w-0 flex ${
        isMobile && !showChatWindow ? 'hidden' : ''
      }`}>
        <ChatWindow
          conversation={selectedConversation}
          currentUser={mockCurrentUser}
          messages={messages}
          participants={selectedConversation ? getParticipants(selectedConversation) : []}
          onSendMessage={handleSendMessage}
          onBack={isMobile ? handleBack : undefined}
          className="w-full"
        />
      </div>
    </div>
  );
}
