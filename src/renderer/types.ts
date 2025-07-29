export type TaskType = "Home" | "Work" | "Kids";

export type Priority = "High" | "Medium" | "Low";

export const taskColors: Record<TaskType, string> = {
  Home: "#FFB5BA", // Pastel Pink
  Work: "#B5E6FF", // Pastel Blue
  Kids: "#FFE5B5", // Pastel Orange
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
