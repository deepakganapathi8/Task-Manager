import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  technologies = [
    { name: 'Angular 17', description: 'Modern web framework with standalone components' },
    { name: 'TypeScript', description: 'Strongly typed programming language' },
    { name: 'CSS3', description: 'Modern styling with animations and gradients' }
  ];

  concepts = [
    {
      title: 'Component Communication',
      description: '&#64;Input decorators pass data from parent to child components (TaskItem receives task data)',
      example: '&#64;Output with EventEmitter sends events from child to parent (TaskForm emits taskAdded event)'
    },
    {
      title: 'Custom Pipes',
      description: 'TaskFilterPipe filters tasks by status and priority',
      example: 'PriorityLabelPipe transforms priority values to display-friendly labels with emojis'
    },
    {
      title: 'Routing & Navigation',
      description: 'App uses Angular Router for navigation between pages',
      example: 'RouterLink directives in header for navigation, routerLinkActive for active states'
    },
    {
      title: 'Lazy Loading',
      description: 'Components are loaded on-demand using loadComponent() in routes',
      example: 'Improves initial load time by splitting code into smaller chunks'
    }
  ];
}
