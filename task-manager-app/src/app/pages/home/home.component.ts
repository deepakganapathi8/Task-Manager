import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  showForm = false;
  taskTitle = '';
  taskDescription = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.taskTitle = '';
      this.taskDescription = '';
    }
  }

  saveTask(): void {
    if (this.taskTitle.trim()) {
      this.taskService.addTask({
        title: this.taskTitle.trim(),
        description: this.taskDescription.trim(),
        completed: false
      });
      this.taskTitle = '';
      this.taskDescription = '';
      this.showForm = false;
    }
  }

  toggleComplete(taskId: number): void {
    this.taskService.toggleTaskStatus(taskId);
  }

  deleteTask(taskId: number): void {
    if (confirm('Delete this task?')) {
      this.taskService.deleteTask(taskId);
    }
  }
}
