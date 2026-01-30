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
        // Real-time component subscription (placeholder for real websocket/polling)
        // Currently idle to avoid confusing fake errors
        return () => { };
    },


    getRecentLogs(): LogEntryType[] {
        // Generate some initial logs
        return Array.from({ length: 3 }).map((_, i) => ({
            id: i.toString(),
            timestamp: new Date(Date.now() - i * 1000 * 60),
            level: 'info',
            message: i === 0 ? 'Admin Dashboard ready' : 'System checks passed',
            source: 'System'
        }));

    }
};
