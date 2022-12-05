import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './pages/Header';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
