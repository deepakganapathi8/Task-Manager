import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Angular Tutorial',
      description: 'Learn about components, routing, and services',
      priority: 'high',
      completed: false,
      createdAt: new Date('2025-11-15')
    },
    {
      id: 2,
      title: 'Build Task Manager App',
      description: 'Implement all features with best practices',
      priority: 'high',
      completed: false,
      createdAt: new Date('2025-11-16')
    },
    {
      id: 3,
      title: 'Review Code',
      description: 'Check for any improvements',
      priority: 'medium',
      completed: true,
      createdAt: new Date('2025-11-14')
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: number, updates: Partial<Task>): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updates };
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleTaskStatus(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.tasksSubject.next([...this.tasks]);
    }
  }

  private generateId(): number {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map(t => t.id)) + 1
      : 1;
  }
}
