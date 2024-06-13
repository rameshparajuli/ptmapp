import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
      saveToStorage(state);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const { id, title, description, completed } = action.payload;
      const existingTask = state.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.completed = completed;
        saveToStorage(state);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveToStorage(state);
      }
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
  },
});

const saveToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to AsyncStorage", error);
  }
};

export const { addTask, editTask, deleteTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
