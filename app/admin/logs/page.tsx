import { RealTimeLogConsole } from '@/components/organisms/RealTimeLogConsole';

export default function LogsPage() {
    return (
        <div className="space-y-6 h-[calc(100vh-100px)]">
            <RealTimeLogConsole />
        </div>
    );
}
