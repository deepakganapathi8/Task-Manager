import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  public tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.generateId()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
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
