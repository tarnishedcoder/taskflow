export interface Task {
    id: string;
    name: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface BoardData {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[];
}