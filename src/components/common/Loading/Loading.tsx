import { cn } from '@/libs/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  className,
  fullScreen = false,
}) => {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-2',
        className
      )}
    >
      <Loader2 className={cn('animate-spin text-primary', sizeStyles[size])} />
      {text && (
        <p className="text-sm text-muted-foreground font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
