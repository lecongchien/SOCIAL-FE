"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Avatar,
    Button,
    Post,
    Comment,
    UserCard,
    CreatePost,
    Input,
    Textarea,
    Modal,
    Loading,
} from '@/components/common';

const ComponentsDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock data
    const mockUser = {
        id: '1',
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Frontend Developer | React Enthusiast | Coffee Lover ☕',
        verified: true,
        followers: 1500,
        following: 300,
        postsCount: 42,
    };

    const mockPost = {
        id: '1',
        author: mockUser,
        content: 'Vừa hoàn thành một dự án React mới! Cảm ơn team đã hỗ trợ rất nhiều. 🚀\n\n#ReactJS #Frontend #TeamWork',
        images: [
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop',
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 42,
        comments: 8,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
    };

    const mockComment = {
        id: '1',
        author: {
            id: '2',
            name: 'Trần Thị B',
            username: 'tranthib',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b73b6ac8?w=150&h=150&fit=crop&crop=face',
            verified: false,
        },
        content: 'Chúc mừng bạn! Dự án này trông rất ấn tượng đấy 👏',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        likes: 5,
        replies: [],
        isLiked: true,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Social App Components Demo - Original
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Tập hợp các component chuẩn để xây dựng social app
                    </p>
                    <div className="flex justify-center">
                        <Link href="/demo/components">
                            <Button variant="outline">
                                View Upgraded Components (shadcn/ui) →
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Avatar Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Avatar Component</h2>
                    <div className="flex items-center space-x-4">
                        <Avatar size="xs" src={mockUser.avatar} alt={mockUser.name} />
                        <Avatar size="sm" src={mockUser.avatar} alt={mockUser.name} status="online" />
                        <Avatar size="md" src={mockUser.avatar} alt={mockUser.name} status="away" />
                        <Avatar size="lg" src={mockUser.avatar} alt={mockUser.name} status="busy" />
                        <Avatar size="xl" fallback="NA" status="offline" />
                        <Avatar size="2xl" fallback="AB" />
                    </div>
                </section>

                {/* Button Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Button Component</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </section>

                {/* Form Components */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Form Components</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="your@email.com"
                                helperText="We'll never share your email"
                            />
                        </div>
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Textarea
                                label="Bio"
                                placeholder="Tell us about yourself..."
                                maxLength={150}
                                showCharCount
                                rows={4}
                            />
                        </div>
                    </div>
                </section>

                {/* CreatePost Component */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Create Post Component</h2>
                    <CreatePost
                        user={mockUser}
                        onSubmit={(data) => {
                            console.log('Post data:', data);
                            alert('Post created! Check console for data.');
                        }}
                    />
                </section>

                {/* Post Component */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Post Component</h2>
                    <Post
                        {...mockPost}
                        onLike={(id) => console.log('Like post:', id)}
                        onComment={(id) => console.log('Comment post:', id)}
                        onShare={(id) => console.log('Share post:', id)}
                        onBookmark={(id) => console.log('Bookmark post:', id)}
                        onUserClick={(id) => console.log('User click:', id)}
                    />
                </section>

                {/* Comment Component */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Comment Component</h2>
                    <Comment
                        {...mockComment}
                        onLike={(id) => console.log('Like comment:', id)}
                        onReply={(id) => console.log('Reply comment:', id)}
                        onUserClick={(id) => console.log('User click:', id)}
                    />
                </section>

                {/* UserCard Component */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">User Card Component</h2>
                    <div className="space-y-4">
                        <UserCard
                            user={mockUser}
                            variant="default"
                            onFollow={(id) => console.log('Follow:', id)}
                            onUnfollow={(id) => console.log('Unfollow:', id)}
                            onClick={(id) => console.log('User profile:', id)}
                        />
                        <UserCard
                            user={mockUser}
                            variant="compact"
                            isFollowing={true}
                            isFollowedBy={true}
                        />
                        <UserCard
                            user={mockUser}
                            variant="minimal"
                        />
                    </div>
                </section>

                {/* Modal & Loading */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Modal & Loading</h2>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </Button>
                    </div>

                    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Loading States:</h3>
                        <div className="flex items-center gap-6">
                            <Loading size="sm" />
                            <Loading size="md" text="Loading..." />
                            <Loading size="lg" text="Please wait..." />
                        </div>
                    </div>
                </section>

                {/* Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Example Modal"
                    footer={
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    }
                >
                    <p className="text-gray-600">
                        This is an example modal with title, content, and footer.
                        You can close it by clicking the X button, clicking outside,
                        or pressing the Escape key.
                    </p>
                </Modal>
            </div>
        </div>
    );
};

export default ComponentsDemo;
