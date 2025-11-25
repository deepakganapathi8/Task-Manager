import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../../shared/task-item/task-item.component';
import { TaskFormComponent } from '../../shared/task-form/task-form.component';
import { TaskFilterPipe } from '../../pipes/task-filter.pipe';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskItemComponent,
    TaskFormComponent,
    TaskFilterPipe
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  currentFilter: string = 'all';
  isLoading = false;
  error: string | null = null;
  private tasksSubscription?: Subscription;

  filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'high', label: '🔴 High Priority' },
    { value: 'medium', label: '🟡 Medium Priority' },
    { value: 'low', label: '🟢 Low Priority' }
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Subscribe to real-time tasks
    this.tasksSubscription = this.taskService.getTasks$().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.error = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.tasksSubscription?.unsubscribe();
  }

  async onTaskAdded(task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      await this.taskService.addTask(task);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  }

  async onToggleStatus(taskId: string): Promise<void> {
    try {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        await this.taskService.updateTask(taskId, { completed: !task.completed });
      }
    } catch (error) {
      console.error('Error toggling task status:', error);
      alert('Failed to update task. Please try again.');
    }
  }

  async onDeleteTask(taskId: string): Promise<void> {
    console.log('TasksComponent: Requesting delete for task', taskId);
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.taskService.deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }
}
