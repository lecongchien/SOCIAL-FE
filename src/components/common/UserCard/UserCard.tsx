import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '../Avatar';
import { Button } from '../button';
import { CheckIcon } from 'lucide-react';

export interface UserCardProps {
    user: {
        id: string;
        name: string;
        username: string;
        avatar?: string;
        bio?: string;
        verified?: boolean;
        followers: number;
        following: number;
        postsCount: number;
    };
    isFollowing?: boolean;
    isFollowedBy?: boolean;
    showStats?: boolean;
    variant?: 'default' | 'compact' | 'minimal';
    className?: string;
    onFollow?: (userId: string) => void;
    onUnfollow?: (userId: string) => void;
    onClick?: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
    user,
    isFollowing = false,
    isFollowedBy = false,
    showStats = true,
    variant = 'default',
    className,
    onFollow,
    onUnfollow,
    onClick,
}) => {
    const [following, setFollowing] = useState(isFollowing);

    const handleFollowToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (following) {
            onUnfollow?.(user.id);
        } else {
            onFollow?.(user.id);
        }
        setFollowing(!following);
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    if (variant === 'minimal') {
        return (
            <div
                className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer",
                    className
                )}
                onClick={() => onClick?.(user.id)}
            >
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="sm"
                />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                        <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                        {user.verified && (
                            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckIcon className="w-2.5 h-2.5 text-primary-foreground" />
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
                <Button
                    variant={following ? "outline" : "default"}
                    size="sm"
                    onClick={handleFollowToggle}
                >
                    {following ? 'Đang theo dõi' : 'Theo dõi'}
                </Button>
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <div
                className={cn(
                    "flex items-start space-x-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors cursor-pointer",
                    className
                )}
                onClick={() => onClick?.(user.id)}
            >
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="md"
                />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-1">
                                <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                                {user.verified && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                        <Button
                            variant={following ? "outline" : "default"}
                            size="sm"
                            onClick={handleFollowToggle}
                        >
                            {following ? 'Đang theo dõi' : 'Theo dõi'}
                        </Button>
                    </div>
                    {user.bio && (
                        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{user.bio}</p>
                    )}
                    {isFollowedBy && (
                        <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                            Theo dõi bạn
                        </span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors cursor-pointer",
                className
            )}
            onClick={() => onClick?.(user.id)}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        size="lg"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-lg text-gray-900 truncate">{user.name}</h3>
                            {user.verified && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500">@{user.username}</p>
                        {isFollowedBy && (
                            <span className="inline-flex items-center px-2 py-1 mt-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                                Theo dõi bạn
                            </span>
                        )}
                    </div>
                </div>
                <Button
                    variant={following ? "outline" : "default"}
                    onClick={handleFollowToggle}
                >
                    {following ? 'Đang theo dõi' : 'Theo dõi'}
                </Button>
            </div>

            {user.bio && (
                <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
            )}

            {showStats && (
                <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                        <p className="font-bold text-gray-900">{formatNumber(user.postsCount)}</p>
                        <p className="text-sm text-gray-500">Bài viết</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-gray-900">{formatNumber(user.followers)}</p>
                        <p className="text-sm text-gray-500">Người theo dõi</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-gray-900">{formatNumber(user.following)}</p>
                        <p className="text-sm text-gray-500">Đang theo dõi</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCard;
