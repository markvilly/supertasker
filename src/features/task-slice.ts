import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { removeUser } from './user-slice';

type TasksState = {
  entities: Task[];
  loading?: boolean;
};

const initialState: TasksState = {
  entities: [],
  loading: false,
};

//async - promises
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (thunkAPI): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((response) =>
      response.json(),
    );
    return response.tasks;
  },
);

type DraftTask = Pick<Task, 'title'>;

const createTask = (draftTask: DraftTask): Task => {
  return { id: nanoid(), ...draftTask };
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTask(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex(
        (task) => task.id === action.payload,
      );
      state.entities.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      const userId = action.payload;
      for (const task of state.entities) {
        if (task.user === userId) {
          task.user = undefined;
        }
      }
    });

    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
const tasksReducer = tasksSlice.reducer;
export default tasksReducer;
