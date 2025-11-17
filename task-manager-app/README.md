# 📋 Task Manager - Angular Learning Project

A comprehensive Angular Task Manager application demonstrating modern Angular concepts including component communication, custom pipes, routing with lazy loading, and reusable UI components.

## 🎯 Project Overview

This project was built to showcase key Angular concepts in a practical, real-world application:

- **Component Communication** using @Input and @Output decorators
- **Custom Pipes** for data transformation and filtering
- **Routing & Navigation** with Angular Router
- **Lazy Loading** for performance optimization
- **Standalone Components** (Modern Angular architecture)
- **Reactive State Management** using RxJS Observables
- **Responsive Design** with modern CSS

## 🚀 Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- 🎯 **Priority Management**: Assign Low, Medium, or High priority to tasks
- ✅ **Task Status**: Mark tasks as complete or active
- 🔍 **Filtering**: Filter tasks by status (All/Active/Completed) and priority
- 📊 **Statistics**: View real-time task statistics
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Angular 17** - Latest Angular framework with standalone components
- **TypeScript** - Strongly typed JavaScript
- **RxJS** - Reactive programming with Observables
- **CSS3** - Modern styling with gradients and animations

## 📁 Project Structure

```
src/app/
├── models/                 # TypeScript interfaces
│   └── task.model.ts      # Task interface definition
│
├── services/              # Business logic & state management
│   └── task.service.ts    # Task CRUD operations & state
│
├── pipes/                 # Custom transformation pipes
│   ├── task-filter.pipe.ts      # Filter tasks by status/priority
│   └── priority-label.pipe.ts   # Transform priority to display label
│
├── shared/                # Reusable components
│   ├── header/           # Navigation header (routing demo)
│   ├── task-item/        # Individual task display (@Input/@Output)
│   └── task-form/        # Task creation form (@Output)
│
└── pages/                 # Route components (lazy loaded)
    ├── home/             # Landing page
    ├── tasks/            # Main task management page
    └── about/            # Project documentation
```

## 🎓 Angular Concepts Demonstrated

### 1. Component Communication (@Input/@Output)

**Parent to Child (@Input):**
```typescript
// In TaskItem component
@Input() task!: Task;
```
The parent `TasksComponent` passes task data down to child `TaskItemComponent`.

**Child to Parent (@Output):**
```typescript
// In TaskItem component
@Output() toggleStatus = new EventEmitter<number>();
@Output() deleteTask = new EventEmitter<number>();

// In TaskForm component
@Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'createdAt'>>();
```
Child components emit events that parent components listen to.

### 2. Custom Pipes

**TaskFilterPipe** - Filters tasks by status or priority:
```typescript
{{ tasks | taskFilter:'active' }}
{{ tasks | taskFilter:'high' }}
```

**PriorityLabelPipe** - Transforms priority values to display-friendly labels:
```typescript
{{ task.priority | priorityLabel }}
// Outputs: 🔴 High, 🟡 Medium, or 🟢 Low
```

### 3. Routing & Navigation

**Route Configuration with Lazy Loading:**
```typescript
export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home/home.component')... },
  { path: 'tasks', loadComponent: () => import('./pages/tasks/tasks.component')... },
  { path: 'about', loadComponent: () => import('./pages/about/about.component')... }
];
```

**Navigation Links:**
```html
<a routerLink="/tasks" routerLinkActive="active">Tasks</a>
```

### 4. Reactive State Management

Using RxJS Observables for reactive data flow:
```typescript
public tasks$ = this.tasksSubject.asObservable();

ngOnInit(): void {
  this.tasks$ = this.taskService.getTasks();
}
```

## 🏃 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17)

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd task-manager-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200/`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📖 Usage Guide

### Creating a Task

1. Navigate to the **Tasks** page
2. Click the "➕ Add New Task" button
3. Fill in the task details:
   - **Title** (required)
   - **Description** (optional)
   - **Priority** (Low/Medium/High)
4. Click "Create Task"

### Managing Tasks

- **Complete/Uncomplete**: Click the checkbox next to any task
- **Delete**: Click the 🗑️ icon on any task
- **Filter**: Use the filter buttons to view:
  - All Tasks
  - Active only
  - Completed only
  - By Priority (High/Medium/Low)

### Navigation

- **Home**: Overview and feature showcase
- **Tasks**: Main task management interface
- **About**: Project documentation and concepts

## 🎨 Key Features Walkthrough

### Component Communication in Action

The `TasksComponent` (parent) manages the overall task list and communicates with child components:

```typescript
// Parent listens to child outputs
<app-task-form (taskAdded)="onTaskAdded($event)"></app-task-form>

<app-task-item
  [task]="task"                          // Input: Pass data down
  (toggleStatus)="onToggleStatus($event)" // Output: Listen to events
  (deleteTask)="onDeleteTask($event)"     // Output: Listen to events
></app-task-item>
```

### Pipe Usage Example

```html
<!-- Filter pipe in action -->
<app-task-item
  *ngFor="let task of tasks | taskFilter:currentFilter"
  [task]="task"
></app-task-item>

<!-- Priority label pipe -->
<span>{{ task.priority | priorityLabel }}</span>
<!-- Displays: 🔴 High, 🟡 Medium, or 🟢 Low -->
```

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a demonstration of Angular best practices and modern development patterns.

## 🌟 Acknowledgments

- Angular Team for the amazing framework
- Angular CLI for scaffolding tools
- The developer community for inspiration

---

**Happy Coding! 🚀**
