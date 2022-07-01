import React from 'react';
import { Game } from './Game';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import './style.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello StackBlitz!</h1>
      <Game />
    </QueryClientProvider>
  );
}
