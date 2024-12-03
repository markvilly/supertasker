import { createAction, createReducer } from '@reduxjs/toolkit';

export const increment = createAction('INCREMENT', (amount: number) => {
  return { payload: amount };
});

export const decrement = createAction('DECTEMENT', (amount: number) => {
  return { payload: amount };
});

export const reset = createAction('RESET');

//REDUCERS

export const counterReducer = createReducer({ counter: 0 }, (builder) => {
  builder.addCase(increment, (state, action) => {
    state.counter += action.payload;
  });

  builder.addCase(reset, (state, action) => {
    state.counter = 0;
  });

  builder.addCase(decrement, (state, action) => {
    state.counter -= action.payload;
  });
});
