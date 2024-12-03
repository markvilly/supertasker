import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/task-slice';
import { usersReducer } from './features/user-slice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});
export type ApplicationType = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export default store;
