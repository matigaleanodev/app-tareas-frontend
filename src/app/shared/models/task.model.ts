export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

export type CreateTask = Pick<Task, 'title' | 'description'>;
