import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/api';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(formData);
      login(userData);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full px-4 py-3 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="w-full px-4 py-3 mt-1 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
