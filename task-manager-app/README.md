# 📋 Task Manager

Minimal Angular task app in 3 files.

## Features

- Add, complete, delete tasks
- Inline form

## Structure

```
src/
├── main.ts                  # Bootstrap
└── app/
    ├── app.component.ts     # All logic
    ├── app.component.html   # Template
    └── app.component.css    # Styles
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
