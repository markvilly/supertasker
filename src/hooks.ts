import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ApplicationDispatch, ApplicationType } from './store';
import { useMemo } from 'react';

export const useAppSelector: TypedUseSelectorHook<ApplicationType> =
  useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;

export const useTasks = () => {
  const tasks = useAppSelector((state) => state.tasks.entities);
  const loading = useAppSelector((state) => !!state.tasks.loading);
  return useMemo(() => [tasks, loading] as const, [tasks, loading]);
};
