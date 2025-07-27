import React, { useState } from 'react';
import { Todo, TaskType, Priority } from './types';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enUS } from 'date-fns/locale';

interface TaskFormProps {
  onSubmit: (todo: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'completedAt'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState<TaskType>('home');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !dueDate) return;

    onSubmit({
      text,
      type,
      dueDate: dueDate.toISOString().split('T')[0],
      priority
    });

    setText('');
    setType('home');
    setDueDate(null);
    setPriority('medium');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
        gap: 2,
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        '& .MuiFormControl-root': { minWidth: 120 }
      }}
    >
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="New task"
        variant="outlined"
        size="small"
        required
      />

      <FormControl size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as TaskType)}
          label="Type"
        >
          <MenuItem value="home">Home</MenuItem>
          <MenuItem value="kids">Kids</MenuItem>
          <MenuItem value="work">Work</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <DatePicker
          label="Due date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          slotProps={{
            textField: {
              size: 'small',
              required: true
            }
          }}
        />
      </LocalizationProvider>

      <FormControl size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          label="Priority"
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ height: '40px' }}
      >
        Ajouter
      </Button>
    </Box>
  );
};
