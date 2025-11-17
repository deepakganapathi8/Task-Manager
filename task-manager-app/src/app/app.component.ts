import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tasks: Task[] = [];
  showForm = false;
  title = '';
  description = '';

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.title = '';
      this.description = '';
    }
  }

  addTask() {
    if (this.title.trim()) {
      this.tasks.push({
        id: Date.now(),
        title: this.title.trim(),
        description: this.description.trim(),
        completed: false
      });
      this.title = '';
      this.description = '';
      this.showForm = false;
    }
  }

  toggle(task: Task) {
    task.completed = !task.completed;
  }

  delete(task: Task) {
    if (confirm('Delete?')) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
  }
}
