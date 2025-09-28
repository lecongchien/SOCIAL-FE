"use client";

import React, { useState } from 'react';
import {
    Button,
    Input,
    Textarea,
    Avatar,
    Modal,
    Loading,
    UserCard
} from '@/components/common';

export default function ComponentsDemo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');

    const mockUser = {
        id: '1',
        name: 'Nguyễn Văn A',
        username: 'nguyenvana',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Software Developer passionate about building great user experiences.',
        verified: true,
        followers: 1234,
        following: 567,
        postsCount: 89
    };

    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Components Demo - Upgraded with shadcn/ui</h1>

            {/* Button Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
                <div className="flex gap-4">
                    <Button loading>Loading...</Button>
                    <Button fullWidth>Full Width</Button>
                </div>
            </section>

            {/* Input Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                    />
                    <Input
                        label="With Error"
                        error="This field is required"
                        placeholder="Enter something..."
                    />
                    <Input
                        label="With Helper Text"
                        helperText="This is some helpful information"
                        placeholder="Helper text demo"
                    />
                </div>
            </section>

            {/* Textarea Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Textarea</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea
                        label="Message"
                        placeholder="Type your message here..."
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                        rows={4}
                    />
                    <Textarea
                        label="With Character Count"
                        placeholder="Max 100 characters..."
                        maxLength={100}
                        showCharCount
                        rows={4}
                    />
                </div>
            </section>

            {/* Avatar Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Avatars</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="xs" />
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="sm" />
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="md" />
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="lg" />
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="xl" />
                    <Avatar src={mockUser.avatar} alt={mockUser.name} size="2xl" />
                </div>
                <div className="flex gap-4">
                    <Avatar fallback="NA" size="md" />
                    <Avatar
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        size="md"
                        status="online"
                    />
                    <Avatar
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        size="md"
                        status="busy"
                    />
                </div>
            </section>

            {/* Modal Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Modal</h2>
                <Button onClick={() => setIsModalOpen(true)}>
                    Open Modal
                </Button>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Demo Modal"
                    description="This is a modal built with shadcn/ui Dialog component."
                    footer={
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    }
                >
                    <p>This is the modal content. The modal is now using Radix UI Dialog primitives for better accessibility and user experience.</p>
                </Modal>
            </section>

            {/* Loading Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Loading</h2>
                <div className="flex gap-8">
                    <Loading size="sm" text="Small loading..." />
                    <Loading size="md" text="Medium loading..." />
                    <Loading size="lg" text="Large loading..." />
                </div>
            </section>

            {/* UserCard Demo */}
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">User Cards</h2>
                <div className="space-y-4">
                    <UserCard user={mockUser} variant="minimal" />
                    <UserCard user={mockUser} variant="compact" isFollowedBy />
                    <UserCard user={mockUser} variant="default" showStats />
                </div>
            </section>
        </div>
    );
}
