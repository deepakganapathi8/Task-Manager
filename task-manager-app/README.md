# 📋 Task Manager - Simple Angular App

A minimal single-page Angular Task Manager application.

## 🚀 Features

- ✅ Add tasks with title and description
- ✅ Toggle tasks complete/incomplete
- ✅ Delete tasks
- 📱 Simple, clean UI

## 🛠️ Technologies

- **Angular 17** - Standalone components
- **TypeScript** - Type safety
- **RxJS** - Reactive state
- **CSS3** - Modern styling

## 📁 Project Structure

```
src/app/
├── models/task.model.ts     # Task interface
├── services/task.service.ts # State management
├── pages/home/              # Main component
├── app.component.*          # Root component
└── app.config.ts            # App configuration
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

## 📖 Usage

1. Click **"+ Add Task"** button on home page
2. Fill in title and description
3. Click **"Save Task"** to add the task
4. On home page:
   - Click **circle/checkmark** to toggle complete
   - Click **X** to delete a task
