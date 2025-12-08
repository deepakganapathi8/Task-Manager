import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, PriorityLabelPipe, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<{ taskId: string, updates: Partial<Task> }>();

  isEditing = false;
  editForm = {
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  };

  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    console.log('TaskItem: Delete clicked for task', this.task.id);
    this.deleteTask.emit(this.task.id);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.isEditing = true;
    // Populate form with current task values
    this.editForm = {
      title: this.task.title,
      description: this.task.description,
      priority: this.task.priority
    };
  }

  onSave(event: Event): void {
    event.stopPropagation();
    if (this.editForm.title.trim()) {
      this.editTask.emit({
        taskId: this.task.id,
        updates: {
          title: this.editForm.title.trim(),
          description: this.editForm.description.trim(),
          priority: this.editForm.priority
        }
      });
      this.isEditing = false;
    }
  }

  onCancel(event: Event): void {
    event.stopPropagation();
    this.isEditing = false;
  }
}
