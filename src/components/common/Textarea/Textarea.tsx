import { Textarea as ShadcnTextarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import React from 'react';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resizable?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  resizable = true,
  maxLength,
  showCharCount = false,
  className,
  id,
  value,
  ...props
}) => {
  const [charCount, setCharCount] = React.useState(0);
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  React.useEffect(() => {
    if (value) {
      setCharCount(value.toString().length);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    props.onChange?.(e);
  };

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <ShadcnTextarea
          id={textareaId}
          value={value}
          maxLength={maxLength}
          className={cn(
            !resizable && 'resize-none',
            error &&
              'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
            className
          )}
          onChange={handleChange}
          {...props}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          {error && <p className="text-sm text-destructive">{error}</p>}

          {helperText && !error && (
            <p className="text-sm text-muted-foreground">{helperText}</p>
          )}
        </div>

        {(showCharCount || maxLength) && (
          <div className="text-sm text-muted-foreground">
            {maxLength ? (
              <span
                className={cn(
                  charCount > maxLength * 0.9 && 'text-orange-500',
                  charCount === maxLength && 'text-destructive'
                )}
              >
                {charCount}/{maxLength}
              </span>
            ) : (
              <span>{charCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Textarea;
