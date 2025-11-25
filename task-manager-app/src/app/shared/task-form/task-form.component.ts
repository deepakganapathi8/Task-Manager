import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>();

  taskTitle = '';
  taskDescription = '';
  taskPriority: 'low' | 'medium' | 'high' = 'medium';
  showForm = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.taskTitle.trim()) {
      this.taskAdded.emit({
        title: this.taskTitle.trim(),
        description: this.taskDescription.trim(),
        priority: this.taskPriority,
        completed: false
      });
      this.resetForm();
      this.showForm = false;
    }
  }

  private resetForm(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskPriority = 'medium';
  }
}
