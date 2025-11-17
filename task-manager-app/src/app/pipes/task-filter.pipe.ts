import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter',
  standalone: true
})
export class TaskFilterPipe implements PipeTransform {

  transform(tasks: Task[] | null, filter: string): Task[] {
    if (!tasks) return [];
    if (!filter || filter === 'all') return tasks;

    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }

    // Filter by priority
    if (['low', 'medium', 'high'].includes(filter)) {
      return tasks.filter(task => task.priority === filter);
    }

    return tasks;
  }

}
