import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private firestore: Firestore = inject(Firestore);
  private authService = inject(AuthService);

  constructor() { }

  // Get all tasks for current user (real-time)
  getTasks$(): Observable<Task[]> {
    return new Observable((observer) => {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser) {
        observer.next([]);
        observer.complete();
        return;
      }

      const tasksRef = collection(this.firestore, `users/${currentUser.uid}/tasks`);
      const q = query(tasksRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const tasks: Task[] = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              userId: currentUser.uid,
              title: data['title'],
              description: data['description'],
              priority: data['priority'],
              completed: data['completed'],
              createdAt: this.convertTimestamp(data['createdAt']),
              updatedAt: this.convertTimestamp(data['updatedAt'])
            };
          });
          observer.next(tasks);
        },
        (error) => {
          console.error('Error getting tasks:', error);
          observer.error(error);
        }
      );

      return () => unsubscribe();
    });
  }

  // Add new task
  async addTask(task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const tasksRef = collection(this.firestore, `users/${currentUser.uid}/tasks`);

      await addDoc(tasksRef, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        completed: task.completed,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  // Update existing task
  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const taskRef = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);

      const updateData: any = { ...updates };
      delete updateData.id;
      delete updateData.userId;
      delete updateData.createdAt;
      updateData.updatedAt = serverTimestamp();

      await updateDoc(taskRef, updateData);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete task
  async deleteTask(taskId: string): Promise<void> {
    try {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const taskRef = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Toggle task completion status
  async toggleTaskStatus(taskId: string): Promise<void> {
    try {
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // We need to get the current task first to toggle it
      // This is handled by the component, so we just need to update
      // The component will pass the new completed status
    } catch (error) {
      console.error('Error toggling task status:', error);
      throw error;
    }
  }

  // Helper to convert Firestore Timestamp to Date
  private convertTimestamp(timestamp: any): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    if (timestamp?.toDate) {
      return timestamp.toDate();
    }
    return new Date();
  }
}
