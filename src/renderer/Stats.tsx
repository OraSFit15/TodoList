import React from "react";
import { Todo, taskColors } from "./types";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
} from "@mui/material";

interface StatsProps {
  todos: Todo[];
}

const Stats: React.FC<StatsProps> = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Sort todos by creation date (newest first)
  const sortedTodos = [...todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Todo Statistics
      </Typography>

      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
              minWidth: 200,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h3" color="secondary.main">
                {totalTodos}
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
              minWidth: 200,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h3" color="success.main">
                {completedTodos}
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
              minWidth: 200,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h3" color="warning.main">
                {pendingTodos}
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" },
              minWidth: 200,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="h3" color="primary.main">
                {completionRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </Paper>
          </Box>
        </Stack>
      </Box>

      <Paper sx={{ mt: 4 }}>
        <Box sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Task</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell>{todo.text}</TableCell>
                    <TableCell>
                      <Chip
                        label={todo.type}
                        size="small"
                        sx={{
                          backgroundColor: taskColors[todo.type],
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          todo.dueDate
                            ? new Date(todo.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "-"
                        }
                        size="small"
                        sx={{
                          backgroundColor: "rgba(128, 128, 128, 0.8)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default Stats;
