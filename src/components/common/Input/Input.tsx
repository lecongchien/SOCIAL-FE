import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    type,
    id,
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [actualType, setActualType] = React.useState(type);

    React.useEffect(() => {
        if (type === 'password') {
            setActualType(showPassword ? 'text' : 'password');
        } else {
            setActualType(type);
        }
    }, [type, showPassword]);

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={cn('space-y-2', fullWidth && 'w-full')}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-foreground"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="text-muted-foreground">
                            {leftIcon}
                        </div>
                    </div>
                )}

                <ShadcnInput
                    id={inputId}
                    type={actualType}
                    className={cn(
                        leftIcon && 'pl-10',
                        (rightIcon || type === 'password') && 'pr-10',
                        error && 'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
                        className
                    )}
                    {...props}
                />

                {(rightIcon || type === 'password') && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {type === 'password' ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        ) : (
                            <div className="text-muted-foreground">
                                {rightIcon}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p className="text-sm text-muted-foreground">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default Input;
