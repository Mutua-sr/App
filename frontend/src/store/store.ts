import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Initial state types
interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'instructor';
  };
}

interface UIState {
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }>;
}

// Initial states
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const initialUIState: UIState = {
  sidebarOpen: true,
  notifications: [],
};

// Create the store
export const store = configureStore({
  reducer: {
    auth: (state = initialAuthState) => state,
    ui: (state = initialUIState) => state,
  },
});

// Typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;