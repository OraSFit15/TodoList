# Electron Todo List

A desktop Todo List application built with Electron, React, and TypeScript. Features a modern UI with pastel colors, local storage persistence, and comprehensive error handling.

## Features

- Create, read, update, and delete todos
- Filter todos by type (Home, Work, Kids)
- Sort and organize by priority (High, Medium, Low)
- Calendar view for date-based organization
- Statistics view with task metrics
- Mark todos as complete/incomplete
- Persistent storage using localStorage
- Modern, pastel-themed UI with consistent styling
- Error handling and loading states
- Comprehensive test coverage

## Tech Stack

- Electron: Desktop application framework
- React: UI library
- TypeScript: Type-safe JavaScript
- Webpack: Module bundling
- Jest & React Testing Library: Testing
- CSS: Modern styling with transitions and animations

## Project Structure

```
TodoList/
├── src/
│   ├── main/           # Electron main process
│   │   ├── index.js    # Entry point loader
│   │   └── main.ts     # Main process implementation
│   └── renderer/       # React renderer process
│       ├── index.html
│       ├── index.tsx   # React entry point
│       ├── App.tsx     # Main application component
│       ├── Stats.tsx   # Statistics view
│       ├── CalendarView.tsx # Calendar view
│       ├── TaskForm.tsx     # Task creation/editing form
│       ├── types.ts         # TypeScript type definitions
│       ├── __tests__/       # Test files
│       └── __mocks__/       # Test mocks
├── dist/              # Build output
├── docs/              # API documentation (generated)
├── webpack.config.js  # Webpack configuration
├── jest.config.js     # Jest test configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

### Key Files

- **src/main/main.ts**: Electron main process with window creation and dev server connection logic
- **src/renderer/App.tsx**: Main React component with task management logic
- **src/renderer/types.ts**: TypeScript type definitions for tasks and application
- **src/renderer/__tests__/TodoCRUD.test.tsx**: CRUD tests for todo operations

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

### Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TodoList
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Building and Installing the Application

#### macOS

1. Clone and set up the project (see Installation section above)

2. Build the packaged application:
   ```bash
   ./build-fixed.sh
   ```

3. The application will be created in `release/mac-arm64/Todo List.app`

4. You can then:
   - Run it directly: `open "release/mac-arm64/Todo List.app"`
   - Copy it to your Applications folder for permanent installation
   - Distribute the .app file to other macOS users

Note: When opening the app for the first time, you may need to right-click the app and select "Open" to bypass macOS security.

## Development

Start the development server with hot reload:
```bash
./run-dev.sh
```

Or manually:
```bash
npm run dev
```

This will:
- Start webpack dev server for React on port 4000
- Compile TypeScript for the main process
- Launch Electron with the development build

### Troubleshooting Development

If you encounter issues with Electron not connecting to the webpack dev server:

1. Make sure port 4000 is not in use by another application:
   ```bash
   lsof -i :4000
   ```
   If it is, you can terminate the process or change the port in `webpack.config.js`.

2. The application includes retry logic to connect to the webpack dev server with improved error handling.

3. If you see errors about webpack compilation, try running the commands separately:
   ```bash
   # Terminal 1: Start webpack dev server
   npm run dev:renderer
   
   # Terminal 2: Build and run Electron
   NODE_ENV=development npm run build:main && npx electron .
   ```

## Building

### Development Build
Build the application for development:
```bash
npm run build
```

This creates:
- Compiled TypeScript for the main process in `dist/main/`
- Bundled React application in `dist/renderer/`

### Production Build (Packaged Application)
Create a packaged .app for macOS:
```bash
./build-fixed.sh
```

This will:
- Build the application
- Create a packaged macOS application in `release/mac-arm64/Todo List.app`
- Handle dependency resolution issues automatically
- Generate a distributable .app file

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Structure

The application uses Jest and React Testing Library for testing:

- **CRUD Tests**: Located in `src/renderer/__tests__/TodoCRUD.test.tsx`
  - Tests the core create, read, update, and delete operations
  - Focuses on functionality rather than UI implementation details
  - Uses simple, isolated test functions for better maintainability

### Jest Configuration

The Jest configuration in `jest.config.js` includes:

- TypeScript support via `ts-jest`
- Module mocking for problematic dependencies like `react-calendar`
- DOM testing environment via `jest-environment-jsdom`

## Architecture

The application follows a two-process architecture typical of Electron applications:

1. **Main Process** (`src/main/main.ts`):
   - Handles window creation and lifecycle
   - Manages application state
   - Loads the renderer process

2. **Renderer Process** (`src/renderer/`):
   - React application for the UI
   - Manages todo state and persistence
   - Handles user interactions

## Known Limitations

- Data is stored locally using localStorage
- No cloud sync functionality
- Single window application

## API Documentation

### Main Components

- **Main Process** (`src/main/main.ts`): Manages Electron window creation and web server connection
- **App Component** (`src/renderer/App.tsx`): Main React component for the application UI and task management
- **Types** (`src/renderer/types.ts`): TypeScript interfaces for Todo items and related types
- **Task Form** (`src/renderer/TaskForm.tsx`): Component for creating and editing tasks
- **Calendar View** (`src/renderer/CalendarView.tsx`): Date-based organization of tasks
- **Stats Component** (`src/renderer/Stats.tsx`): Statistics and metrics view for tasks

## Style Guide

This project follows these styling conventions:

- **Task Types**: Use capitalized values ("Home", "Work", "Kids")
- **Task Priorities**: Use capitalized values ("High", "Medium", "Low")
- **UI Components**: All chips (type, priority, date, status) use consistent pastel color backgrounds with white bold text
- **Code**: TypeScript with consistent type definitions

## Common Issues

### Electron-webpack Connection

If Electron fails to connect to the webpack dev server:

1. The main.ts file includes improved retry logic (5 attempts)
2. Check if another process is using port 4000
3. Try the separate terminal approach described in the Development section
4. Make sure NODE_ENV is set to "development"

### Running the Application

#### Development Mode (recommended for development)

```bash
./run-dev.sh
```

#### Production Mode (packaged application)

After building with `./build-fixed.sh`, launch the packaged application:

```bash
open "release/mac-arm64/Todo List.app"
```

Or simply double-click the `Todo List.app` file in Finder.

#### Manual Production Mode

If you want to test the production build without packaging:

```bash
# Build the application
npm run build

# Fix HTML paths (required workaround)
sed -i '' 's|src="/renderer.js"|src="./renderer.js"|g' dist/renderer/index.html

# Run in production mode
NODE_ENV=production npx electron .
```

## Future Improvements

- Add cloud synchronization
- Multiple windows support
- Export/import functionality
- Dark mode theme
- Mobile companion app

## License

ISC
