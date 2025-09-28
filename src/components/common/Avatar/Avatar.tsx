import React from 'react';
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface AvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    fallback?: string;
    className?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
    onClick?: () => void;
}

const sizeMap = {
    xs: 'size-6',
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-16',
    '2xl': 'size-20',
};

const statusColorMap = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
};

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    size = 'md',
    fallback,
    className,
    status,
    onClick,
}) => {
    const getFallbackText = () => {
        if (fallback) return fallback;
        if (alt) {
            return alt
                .split(' ')
                .map((word) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return '?';
    };

    return (
        <div className="relative inline-flex">
            <ShadcnAvatar
                className={cn(
                    sizeMap[size],
                    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
                    className
                )}
                onClick={onClick}
            >
                {src && <AvatarImage src={src} alt={alt} />}
                <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                    {getFallbackText()}
                </AvatarFallback>
            </ShadcnAvatar>

            {status && (
                <div
                    className={cn(
                        'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
                        statusColorMap[status],
                        size === 'xs' && 'w-2 h-2',
                        size === 'sm' && 'w-2.5 h-2.5',
                        (size === 'xl' || size === '2xl') && 'w-4 h-4'
                    )}
                />
            )}
        </div>
    );
};

export default Avatar;
