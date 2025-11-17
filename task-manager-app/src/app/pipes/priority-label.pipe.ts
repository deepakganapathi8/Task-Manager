import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityLabel',
  standalone: true
})
export class PriorityLabelPipe implements PipeTransform {

  transform(priority: 'low' | 'medium' | 'high'): string {
    const labels: Record<string, string> = {
      'low': '🟢 Low',
      'medium': '🟡 Medium',
      'high': '🔴 High'
    };
    return labels[priority] || priority;
  }

}
