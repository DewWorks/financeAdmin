import { LogEntryType } from '@/components/molecules/LogEntry';

// Mock log generator
const sources = ['FinancePro-API', 'FinancePage-Web', 'Auth-Service', 'Database'];
const messages = {
    info: ['User logged in', 'Transaction processed', 'Data synced', 'Health check OK'],
    warning: ['High latency detected', 'Rate limit approaching', 'Memory usage > 80%'],
    error: ['Database connection failed', 'Payment gateway timeout', 'User update failed', '500 Internal Server Error'],
    success: ['Backup completed', 'Deployment successful', 'Cache cleared']
};

export const logService = {
    subscribe(callback: (log: LogEntryType) => void) {
        const interval = setInterval(() => {
            // 10% chance of error, 20% warning, 70% info/success
            const rand = Math.random();
            let level: LogEntryType['level'] = 'info';
            if (rand < 0.05) level = 'error';
            else if (rand < 0.2) level = 'warning';
            else if (rand < 0.3) level = 'success';

            const source = sources[Math.floor(Math.random() * sources.length)];
            const msgList = messages[level];
            const message = msgList[Math.floor(Math.random() * msgList.length)];

            const log: LogEntryType = {
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
                level,
                message,
                source
            };

            callback(log);
        }, 2000); // New log every 2 seconds

        return () => clearInterval(interval);
    },

    getRecentLogs(): LogEntryType[] {
        // Generate some initial logs
        return Array.from({ length: 10 }).map((_, i) => ({
            id: i.toString(),
            timestamp: new Date(Date.now() - i * 1000 * 60),
            level: 'info',
            message: 'System initialized',
            source: 'System'
        }));
    }
};
