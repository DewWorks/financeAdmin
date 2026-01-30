import { cn } from '@/lib/utils';
import { Badge } from '@/components/atoms/Badge';
import { format } from 'date-fns';

export interface LogEntryType {
    id: string;
    timestamp: Date;
    level: 'info' | 'warning' | 'error' | 'success';
    message: string;
    source: string;
}

interface LogEntryProps {
    entry: LogEntryType;
}

export function LogEntry({ entry }: LogEntryProps) {
    return (
        <div className="flex items-start space-x-4 border-b py-3 last:border-0 hover:bg-muted/50 px-2 rounded-sm transition-colors">
            <div className="w-24 shrink-0 text-xs text-muted-foreground pt-1">
                {format(entry.timestamp, 'HH:mm:ss.SSS')}
            </div>
            <div className="shrink-0">
                <Badge
                    variant={
                        entry.level === 'error'
                            ? 'destructive'
                            : entry.level === 'warning'
                                ? 'warning'
                                : entry.level === 'success'
                                    ? 'success'
                                    : 'secondary'
                    }
                    className="uppercase text-[10px] h-5"
                >
                    {entry.level}
                </Badge>
            </div>
            <div className="grow text-sm font-mono">
                <span className="font-semibold text-primary mr-2">[{entry.source}]</span>
                {entry.message}
            </div>
        </div>
    );
}
