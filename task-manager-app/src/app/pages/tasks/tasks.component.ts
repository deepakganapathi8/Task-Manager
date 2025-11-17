import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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
export class TasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  currentFilter: string = 'all';

  filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'high', label: '🔴 High Priority' },
    { value: 'medium', label: '🟡 Medium Priority' },
    { value: 'low', label: '🟢 Low Priority' }
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  onTaskAdded(task: Omit<Task, 'id' | 'createdAt'>): void {
    this.taskService.addTask(task);
  }

  onToggleStatus(taskId: number): void {
    this.taskService.toggleTaskStatus(taskId);
  }

  onDeleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }
}
