import React, { useState } from "react";
import Calendar from "react-calendar";
import { Todo, taskColors } from "./types";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const StyledCalendarContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  "& .react-calendar": {
    border: "none",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    fontFamily: theme.typography.fontFamily,
  },
}));

const TaskListContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

interface CalendarViewProps {
  todos: Todo[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ todos }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getTodosByDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return todos.filter((todo) => todo.dueDate === dateStr);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const todosForDate = getTodosByDate(date);
    if (todosForDate.length === 0) return null;

    return (
      <Box className="calendar-todos">
        {todosForDate.map((todo) => (
          <Box
            key={todo.id}
            className="calendar-todo-dot"
            sx={{
              backgroundColor: taskColors[todo.type],
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              margin: "1px",
              display: "inline-block",
            }}
            title={todo.text}
          />
        ))}
      </Box>
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const selectedTodos = selectedDate ? getTodosByDate(selectedDate) : [];

  return (
    <Box sx={{ p: 2 }}>
      <StyledCalendarContainer elevation={2}>
        <Calendar
          tileContent={tileContent}
          className="react-calendar"
          onClickDay={handleDateClick}
          value={selectedDate}
        />
      </StyledCalendarContainer>

      {selectedDate && (
        <TaskListContainer elevation={2}>
          {selectedTodos.length === 0 ? (
            <Typography color="text.secondary">
              Aucune tâche pour cette date
            </Typography>
          ) : (
            <List>
              {selectedTodos.map((todo) => (
                <React.Fragment key={todo.id}>
                  <ListItem
                    sx={{
                      borderLeft: `4px solid ${taskColors[todo.type]}`,
                      bgcolor: todo.completed ? "action.hover" : "transparent",
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary={todo.text}
                      secondary={
                        <Stack direction="row" spacing={1} mt={0.5}>
                          <Chip
                            label={todo.type}
                            size="small"
                            sx={{
                              backgroundColor: taskColors[todo.type],
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                          <Chip
                            label={todo.priority}
                            size="small"
                            sx={{
                              backgroundColor:
                                todo.priority === "High"
                                  ? "#993333"
                                  : todo.priority === "Medium"
                                  ? "#FF9966"
                                  : "#66CC99",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                          <Chip
                            label={todo.completed ? "Completed" : "In Progress"}
                            size="small"
                            sx={{
                              backgroundColor: todo.completed
                                ? "success.main"
                                : "warning.main",
                              color: "white",
                              fontWeight: "bold",
                            }}
                          />
                        </Stack>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </TaskListContainer>
      )}
    </Box>
  );
};
