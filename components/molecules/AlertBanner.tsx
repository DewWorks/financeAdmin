import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const alertVariants = cva(
    'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    {
        variants: {
            variant: {
                default: 'bg-background text-foreground',
                destructive:
                    'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
                success:
                    'border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600',
                warning:
                    'border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

interface AlertBannerProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
    title: string;
    description?: string;
}

export function AlertBanner({
    className,
    variant = 'default',
    title,
    description,
    ...props
}: AlertBannerProps) {
    const Icon =
        variant === 'destructive'
            ? XCircle
            : variant === 'success'
                ? CheckCircle
                : variant === 'warning'
                    ? AlertTriangle
                    : Info;

    return (
        <div
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        >
            <Icon className="h-4 w-4" />
            <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
            {description && (
                <div className="text-sm [&_p]:leading-relaxed">{description}</div>
            )}
        </div>
    );
}
