import React, { useState, useEffect } from "react";
import { Todo, TaskType, taskColors } from "./types";
import Stats from "./Stats";
import { TaskForm } from "./TaskForm";
import { CalendarView } from "./CalendarView";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  CssBaseline,
  AppBar,
  Tabs,
  Tab,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enUS } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#89CFF0", // Pastel Blue
      },
      secondary: {
        main: "#FFB5BA", // Pastel Pink
      },
      error: {
        main: "#FF9999", // Pastel Red for high priority
      },
      warning: {
        main: "#FFE5B5", // Pastel Orange for medium priority
      },
      success: {
        main: "#B5E6B5", // Pastel Green
      },
    },
  },
  enUS
);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"todos" | "stats" | "calendar">(
    "todos"
  );
  const [selectedType, setSelectedType] = useState<TaskType | "all">("all");

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (err) {
      setError("Failed to save todos");
    }
  }, [todos]);

  const addTodo = (
    todoData: Omit<Todo, "id" | "completed" | "createdAt" | "completedAt">
  ) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : undefined,
          };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    selectedType === "all" ? true : todo.type === selectedType
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
        <AppBar
          position="static"
          color="default"
          sx={{ borderRadius: 1, mb: 3 }}
        >
          <Tabs
            value={activeView}
            onChange={(_, newValue) => setActiveView(newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Tasks" value="todos" />
            <Tab label="Statistics" value="stats" />
            <Tab label="Calendar" value="calendar" />
          </Tabs>
        </AppBar>

        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : (
          <Box>
            {activeView === "todos" && (
              <>
                <TaskForm onSubmit={addTodo} />

                <Paper
                  sx={{
                    p: 3,
                    mb: 2,
                    backgroundColor: "rgba(246, 246, 246, 0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 20,
                        bgcolor: "primary.main",
                        mr: 2,
                        borderRadius: 4,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Filter by task type
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip
                      label="ALL TASKS"
                      onClick={() => setSelectedType("all")}
                      variant={selectedType === "all" ? "filled" : "outlined"}
                      sx={{
                        pl: 0.5,
                        backgroundColor:
                          selectedType === "all" ? "#9C27B0" : "transparent",
                        color: selectedType === "all" ? "white" : "inherit",
                        opacity: selectedType === "all" ? 1 : 0.6,
                        "& .MuiChip-label": {
                          fontWeight: selectedType === "all" ? 500 : 400,
                        },
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor:
                              selectedType === "all" ? "white" : "#9C27B0",
                            borderRadius: "50%",
                            ml: 1,
                          }}
                        />
                      }
                    />
                    {Object.entries(taskColors).map(([type, color]) => (
                      <Chip
                        key={type}
                        label={
                          type === "Home"
                            ? "HOME"
                            : type === "Kids"
                            ? "KIDS"
                            : type === "Work"
                            ? "WORK"
                            : type.toUpperCase()
                        }
                        onClick={() => setSelectedType(type as TaskType)}
                        variant={selectedType === type ? "filled" : "outlined"}
                        sx={{
                          backgroundColor:
                            selectedType === type
                              ? taskColors[type as TaskType]
                              : `${taskColors[type as TaskType]}20`,
                          opacity:
                            selectedType === type
                              ? 1
                              : selectedType === "all"
                              ? 0.8
                              : 0.5,
                          borderColor: taskColors[type as TaskType],
                          borderWidth: 2,
                          "& .MuiChip-label": {
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            color:
                              selectedType === type
                                ? "#fff"
                                : taskColors[type as TaskType],
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>

                <List
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    "& .MuiListItem-root": {
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translateX(0)",
                      opacity: 1,
                    },
                    "& .MuiListItem-root.entering": {
                      transform: "translateX(-100%)",
                      opacity: 0,
                    },
                    "& .MuiListItem-root.completed": {
                      animation: "completedTask 0.5s forwards",
                    },
                    "@keyframes completedTask": {
                      "0%": {
                        transform: "scale(1)",
                        opacity: 1,
                      },
                      "50%": {
                        transform: "scale(1.05)",
                        opacity: 0.7,
                      },
                      "100%": {
                        transform: "scale(1)",
                        opacity: 0.6,
                      },
                    },
                  }}
                >
                  {filteredTodos.map((todo) => (
                    <ListItem
                      key={todo.id}
                      className={todo.completed ? "completed" : ""}
                      sx={{
                        borderLeft: `4px solid ${taskColors[todo.type]}`,
                        mb: 1,
                        bgcolor: "white",
                        borderRadius: 1,
                        boxShadow: 1,
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-3px)",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        },
                      }}
                      secondaryAction={
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton
                            onClick={() => deleteTodo(todo.id)}
                            sx={{
                              transition:
                                "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                color: "error.main",
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => toggleTodo(todo.id)}
                            sx={{
                              transition:
                                "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                          >
                            {todo.completed ? (
                              <CheckCircleIcon
                                color="success"
                                sx={{
                                  animation:
                                    "checkmark 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                                  "@keyframes checkmark": {
                                    "0%": {
                                      transform: "scale(0)",
                                      opacity: 0,
                                    },
                                    "50%": {
                                      transform: "scale(1.2)",
                                    },
                                    "100%": {
                                      transform: "scale(1)",
                                      opacity: 1,
                                    },
                                  },
                                }}
                              />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={todo.text}
                        secondary={
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                              mt: 0.5,
                            }}
                          >
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
                              size="small"
                              label={new Date(
                                todo.dueDate
                              ).toLocaleDateString()}
                              sx={{
                                backgroundColor: "rgba(128, 128, 128, 0.8)",
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
                          </Box>
                        }
                        sx={{
                          opacity: todo.completed ? 0.7 : 1,
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}

            {activeView === "stats" && <Stats todos={todos} />}
            {activeView === "calendar" && <CalendarView todos={todos} />}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;
