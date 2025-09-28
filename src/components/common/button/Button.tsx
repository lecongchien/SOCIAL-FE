import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    size = 'default',
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    className,
    disabled,
    asChild = false,
    ...props
}) => {
    const isDisabled = disabled || loading;

    return (
        <ShadcnButton
            variant={variant}
            size={size}
            className={cn(
                fullWidth && 'w-full',
                className
            )}
            disabled={isDisabled}
            asChild={asChild}
            {...props}
        >
            {loading && (
                <Loader2 className="animate-spin" />
            )}

            {!loading && leftIcon && leftIcon}

            {children}

            {!loading && rightIcon && rightIcon}
        </ShadcnButton>
    );
};

export default Button;
