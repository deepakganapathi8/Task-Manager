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
  @Output() toggleStatus = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();

  onToggleStatus(): void {
    this.toggleStatus.emit(this.task.id);
  }

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }
}
