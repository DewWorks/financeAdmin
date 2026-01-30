'use client';

import { useRef, useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { LogEntry, LogEntryType } from '@/components/molecules/LogEntry';
import { logService } from '@/lib/services/logService';
// import { ScrollArea } from '@/components/ui/scroll-area'; 
import { Button } from '@/components/atoms/Button';
import { Pause, Play, Trash } from 'lucide-react';


export function RealTimeLogConsole() {
    const [logs, setLogs] = useState<LogEntryType[]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial logs
        const initialLogs = logService.getRecentLogs();
        setLogs(initialLogs);

        // Subscribe to new logs
        const unsubscribe = logService.subscribe((newLog) => {
            if (!isPaused) {
                setLogs((prev) => [...prev.slice(-99), newLog]); // Keep last 100 logs
            }
        });

        return () => unsubscribe();
    }, [isPaused]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (!isPaused && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs, isPaused]);

    return (
        <Card className="h-[400px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Real-Time Logs</CardTitle>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPaused(!isPaused)}
                        className="h-8 text-xs"
                    >
                        {isPaused ? <Play className="mr-1 h-3 w-3" /> : <Pause className="mr-1 h-3 w-3" />}
                        {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLogs([])}
                        className="h-8 text-xs text-muted-foreground hover:text-destructive"
                    >
                        <Trash className="mr-1 h-3 w-3" />
                        Clear
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 relative">
                <div className="h-full overflow-y-auto p-4 space-y-1 bg-black/5 dark:bg-black/20 font-mono text-sm">
                    {logs.length === 0 && <div className="text-center text-muted-foreground py-8">No logs yet...</div>}
                    {logs.map((log) => (
                        <LogEntry key={log.id} entry={log} />
                    ))}
                    <div ref={bottomRef} />
                </div>
            </CardContent>
        </Card>
    );
}
