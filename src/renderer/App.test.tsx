import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn()
} as Storage;

type LocalStorageMock = {
  getItem: jest.Mock;
  setItem: jest.Mock;
  clear: jest.Mock;
  length: number;
  key: jest.Mock;
  removeItem: jest.Mock;
};
global.localStorage = localStorageMock;

describe('Todo List App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    jest.clearAllMocks();
  });

  test('adds a new todo', () => {
    render(<App />);
    
    // Get input and add button
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add');

    // Type a new todo and click add
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    // Check if todo was added
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('todos', expect.any(String));

    // Check if input was cleared
    expect(input).toHaveValue('');
  });

  test('toggles todo completion', () => {
    render(<App />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    // Get checkbox and click it
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    // Check if todo was marked as completed
    const todoText = screen.getByText('Test todo');
    expect(todoText.parentElement).toHaveClass('completed');
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2); // Once for add, once for toggle
  });

  test('deletes a todo', () => {
    render(<App />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByText('Add');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    // Get delete button and click it
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Check if todo was removed
    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2); // Once for add, once for delete
  });

  test('loads todos from localStorage', () => {
    const savedTodos = [
      { id: 1, text: 'Saved todo', completed: false }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedTodos));

    render(<App />);

    // Check if saved todo was loaded
    expect(screen.getByText('Saved todo')).toBeInTheDocument();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('todos');
  });

  test('handles localStorage errors', () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });

    render(<App />);

    // Check if error message is displayed
    expect(screen.getByText('Failed to load todos')).toBeInTheDocument();
  });
});
