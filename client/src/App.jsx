import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

function ToastWithTheme() {
  const { theme } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      theme={theme}
      toastClassName="rounded-xl text-sm font-medium"
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/tasks/:id" element={<TaskDetails />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastWithTheme />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
