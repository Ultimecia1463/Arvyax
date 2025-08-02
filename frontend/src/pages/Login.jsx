import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { authAPI } from '../services/authAPI';
import Toast from '../components/Toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.login(form);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 bg-[radial-gradient(#b5b8bd_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="bg-base-100 p-8 card shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold font-heading mb-6 text-center text-primary">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 input focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 input focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full btn btn-soft btn-primary transition text-lg"
          >
            Login 
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-base-content">
          Don't have an account?
          <Link to="/register" className="ml-3 link link-primary link-hover">
            Register
          </Link>
        </p>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Login;
