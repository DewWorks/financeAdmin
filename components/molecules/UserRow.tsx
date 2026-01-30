import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { MoreHorizontal, Edit, Trash2, Ban } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Using simple div for now to avoid complexity

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'manager';
    status: 'active' | 'blocked' | 'pending';
    lastActive: string;
}

interface UserRowProps {
    user: User;
    onEdit: (id: string) => void;
    onBlock: (id: string) => void;
}

export function UserRow({ user, onEdit, onBlock }: UserRowProps) {
    return (
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td className="p-4 align-middle">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                </div>
            </td>
            <td className="p-4 align-middle">
                <Badge variant="outline">{user.role}</Badge>
            </td>
            <td className="p-4 align-middle">
                <Badge
                    variant={
                        user.status === 'active'
                            ? 'success'
                            : user.status === 'blocked'
                                ? 'destructive'
                                : 'secondary'
                    }
                >
                    {user.status}
                </Badge>
            </td>
            <td className="p-4 align-middle text-sm text-muted-foreground">
                {user.lastActive}
            </td>
            <td className="p-4 align-middle text-right">
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(user.id)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onBlock(user.id)}>
                        {user.status === 'blocked' ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </Button>
                </div>
            </td>
        </tr>
    );
}

import { CheckCircle } from 'lucide-react'; // Added missing import
