import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'muted';
}

const Text = React.forwardRef<HTMLElement, TextProps>(
    ({ className, as, variant = 'body', ...props }, ref) => {
        const Component = as || (variant.startsWith('h') ? (variant as any) : 'p');

        const styles = {
            h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
            h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
            body: 'leading-7 [&:not(:first-child)]:mt-6',
            small: 'text-sm font-medium leading-none',
            muted: 'text-sm text-muted-foreground',
        };

        return (
            <Component
                ref={ref}
                className={cn(styles[variant], className)}
                {...props}
            />
        );
    }
);
Text.displayName = 'Text';

export { Text };
