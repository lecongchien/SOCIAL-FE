import React, { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Avatar } from '../Avatar';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export interface CommentProps {
    id: string;
    author: {
        id: string;
        name: string;
        username: string;
        avatar?: string;
        verified?: boolean;
    };
    content: string;
    createdAt: Date;
    likes: number;
    replies?: CommentProps[];
    isLiked?: boolean;
    className?: string;
    level?: number;
    onLike?: (commentId: string) => void;
    onReply?: (commentId: string) => void;
    onUserClick?: (userId: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
    id,
    author,
    content,
    createdAt,
    likes,
    replies = [],
    isLiked = false,
    className,
    level = 0,
    onLike,
    onReply,
    onUserClick,
}) => {
    const [liked, setLiked] = useState(isLiked);
    const [likeCount, setLikeCount] = useState(likes);
    const [showReplies, setShowReplies] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => liked ? prev - 1 : prev + 1);
        onLike?.(id);
    };

    const maxLevel = 3; // Maximum nesting level for replies

    return (
        <div className={cn("group", className)}>
            <div className={cn(
                "flex space-x-3",
                level > 0 && "ml-6 pl-4 border-l-2 border-gray-100"
            )}>
                <Avatar
                    src={author.avatar}
                    alt={author.name}
                    size={level === 0 ? "md" : "sm"}
                    onClick={() => onUserClick?.(author.id)}
                    className="cursor-pointer flex-shrink-0"
                />

                <div className="min-w-0 flex-1">
                    {/* Comment Header */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={() => onUserClick?.(author.id)}
                            className="font-semibold text-gray-900 hover:underline text-sm"
                        >
                            {author.name}
                        </button>
                        {author.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        <span className="text-gray-500 text-sm">@{author.username}</span>
                        <span className="text-gray-400 text-sm">·</span>
                        <time className="text-gray-500 text-sm" dateTime={createdAt.toISOString()}>
                            {formatDistanceToNow(createdAt, { locale: vi, addSuffix: true })}
                        </time>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-gray-100 transition-all">
                            <MoreHorizontal className="w-3 h-3 text-gray-500" />
                        </button>
                    </div>

                    {/* Comment Content */}
                    <div className="mt-1">
                        <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                            {content}
                        </p>
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 mt-2">
                        <button
                            onClick={handleLike}
                            className={cn(
                                "flex items-center space-x-1 px-2 py-1 rounded-full transition-colors text-xs",
                                liked
                                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                                    : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                            )}
                        >
                            <Heart className={cn("w-3 h-3", liked && "fill-current")} />
                            <span className="font-medium">{likeCount}</span>
                        </button>

                        {level < maxLevel && (
                            <button
                                onClick={() => onReply?.(id)}
                                className="flex items-center space-x-1 px-2 py-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors text-xs"
                            >
                                <MessageCircle className="w-3 h-3" />
                                <span className="font-medium">Trả lời</span>
                            </button>
                        )}

                        {replies.length > 0 && (
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="text-blue-500 hover:text-blue-600 text-xs font-medium"
                            >
                                {showReplies ? 'Ẩn' : 'Xem'} {replies.length} phản hồi
                            </button>
                        )}
                    </div>

                    {/* Replies */}
                    {showReplies && replies.length > 0 && (
                        <div className="mt-3 space-y-3">
                            {replies.map((reply) => (
                                <Comment
                                    key={reply.id}
                                    {...reply}
                                    level={level + 1}
                                    onLike={onLike}
                                    onReply={onReply}
                                    onUserClick={onUserClick}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
