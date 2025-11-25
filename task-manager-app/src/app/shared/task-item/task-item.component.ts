import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { PriorityLabelPipe } from '../../pipes/priority-label.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, PriorityLabelPipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();

  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    console.log('TaskItem: Delete clicked for task', this.task.id);
    this.deleteTask.emit(this.task.id);
  }
}
