export interface Task {
  id: string;  // Firestore document ID
  userId: string;  // Owner of the task
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
