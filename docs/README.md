**Todo List API Documentation v1.0.0**

***

# Electron Todo List

A desktop Todo List application built with Electron, React, and TypeScript. Features a modern UI with pastel colors, local storage persistence, and comprehensive error handling.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Persistent storage using localStorage
- Modern, pastel-themed UI
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
│   │   └── main.ts
│   └── renderer/       # React renderer process
│       ├── index.html
│       ├── index.tsx
│       ├── App.tsx
│       └── styles.css
├── dist/              # Build output
├── webpack.config.js  # Webpack configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TodoList
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

This will:
- Start webpack dev server for React
- Compile TypeScript for the main process
- Launch Electron with the development build

## Building

Build the application:
```bash
npm run build
```

This creates:
- Compiled TypeScript for the main process in `dist/main/`
- Bundled React application in `dist/`

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

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

## Future Improvements

- Add cloud synchronization
- Multiple windows support
- Categories for todos
- Due dates and reminders
- Export/import functionality

## License

ISC
