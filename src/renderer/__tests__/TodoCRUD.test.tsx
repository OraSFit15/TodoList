import { Todo, TaskType, Priority } from '../types';

// Simple CRUD functions for testing
const addTodo = (text: string): Todo => {
  const todo: Todo = {
    id: '1',
    text,
    type: 'Home',
    priority: 'Medium',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  };
  return todo;
};

const updateTodo = (todo: Todo, completed: boolean): Todo => {
  return { ...todo, completed };
};

const deleteTodo = (todos: Todo[], id: string): Todo[] => {
  return todos.filter(todo => todo.id !== id);
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Simple Todo CRUD Tests', () => {
  test('CREATE: Should create a new todo', () => {
    const todo = addTodo('Test Task');
    
    expect(todo.text).toBe('Test Task');
    expect(todo.type).toBe('Home');
    expect(todo.priority).toBe('Medium');
    expect(todo.completed).toBe(false);
    expect(todo.id).toBe('1');
  });

  test('UPDATE: Should mark todo as completed', () => {
    const todo = addTodo('Task to complete');
    const updatedTodo = updateTodo(todo, true);
    
    expect(updatedTodo.completed).toBe(true);
    expect(updatedTodo.text).toBe('Task to complete');
  });

  test('DELETE: Should remove todo from list', () => {
    const todo1 = addTodo('Task 1');
    const todo2 = addTodo('Task 2');
    const todos = [todo1, { ...todo2, id: '2' }];
    
    const remainingTodos = deleteTodo(todos, '1');
    
    expect(remainingTodos).toHaveLength(1);
    expect(remainingTodos[0].text).toBe('Task 2');
  });

  test('READ: Should return todo properties', () => {
    const todo = addTodo('Read Test');
    
    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('text');
    expect(todo).toHaveProperty('type');
    expect(todo).toHaveProperty('priority');
    expect(todo).toHaveProperty('completed');
    expect(todo).toHaveProperty('createdAt');
    expect(todo).toHaveProperty('dueDate');
  });
});
