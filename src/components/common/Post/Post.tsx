'use client';

import { cn } from '@/utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share,
} from 'lucide-react';
import React, { useState } from 'react';
import { Avatar } from '../Avatar';

export interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  images?: string[];
  video?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  className?: string;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onUserClick?: (userId: string) => void;
}

export const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  images = [],
  video,
  createdAt,
  likes,
  comments,
  shares,
  isLiked = false,
  isBookmarked = false,
  className,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onUserClick,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    onLike?.(id);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(id);
  };

  const renderMedia = () => {
    if (video) {
      return (
        <div className="mt-3 rounded-2xl overflow-hidden bg-gray-100">
          <video
            className="w-full h-auto max-h-96 object-cover"
            controls
            preload="metadata"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (images.length > 0) {
      return (
        <div
          className={cn(
            'mt-3 rounded-2xl overflow-hidden',
            images.length === 1 && 'max-h-96',
            images.length === 2 && 'grid grid-cols-2 gap-1',
            images.length === 3 && 'grid grid-cols-2 gap-1',
            images.length >= 4 && 'grid grid-cols-2 gap-1'
          )}
        >
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative bg-gray-100',
                images.length === 3 && index === 0 && 'row-span-2',
                images.length >= 4 && index >= 2 && 'aspect-square'
              )}
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {images.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <article
      className={cn(
        'bg-white border border-gray-200 rounded-2xl p-4 hover:bg-gray-50/50 transition-colors',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Avatar
            src={author.avatar}
            alt={author.name}
            size="md"
            onClick={() => onUserClick?.(author.id)}
            className="cursor-pointer"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onUserClick?.(author.id)}
                className="font-semibold text-gray-900 hover:underline truncate"
              >
                {author.name}
              </button>
              {author.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>@{author.username}</span>
              <span>·</span>
              <time dateTime={createdAt.toISOString()}>
                {formatDistanceToNow(createdAt, {
                  locale: vi,
                  addSuffix: true,
                })}
              </time>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
        {renderMedia()}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-full transition-colors',
              liked
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
            )}
          >
            <Heart className={cn('w-4 h-4', liked && 'fill-current')} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <button
            onClick={() => onComment?.(id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{comments}</span>
          </button>

          <button
            onClick={() => onShare?.(id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
          >
            <Share className="w-4 h-4" />
            <span className="text-sm font-medium">{shares}</span>
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={cn(
            'p-2 rounded-full transition-colors',
            bookmarked
              ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
              : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50'
          )}
        >
          <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-current')} />
        </button>
      </div>
    </article>
  );
};

export default Post;
