import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: '📝',
      title: 'Create Tasks',
      description: 'Easily add new tasks with title, description, and priority levels'
    },
    {
      icon: '🎯',
      title: 'Manage Priorities',
      description: 'Organize tasks by priority: Low, Medium, or High'
    },
    {
      icon: '✅',
      title: 'Track Progress',
      description: 'Mark tasks as complete and filter by status'
    },
    {
      icon: '🔍',
      title: 'Filter & Search',
      description: 'Use custom pipes to filter tasks by status and priority'
    }
  ];
}
