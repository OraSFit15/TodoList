export type TaskType = 'home' | 'work' | 'kids';

export type Priority = 'high' | 'medium' | 'low';

export const taskColors: Record<TaskType, string> = {
  home: '#FFB5BA',    // Pastel Pink
  work: '#B5E6FF',    // Pastel Blue
  kids: '#FFE5B5'     // Pastel Orange
};

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  type: TaskType;
  dueDate: string;
  priority: Priority;
}
