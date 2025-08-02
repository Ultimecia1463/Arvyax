import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-transparent backdrop-blur-[1.2px] shadow-lg sticky top-0 z-40 border-b border-neutral/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-4xl font-bold font-heading bg-clip-text text-neutral font-stretch-ultra-expanded">
                ArvyaX
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-base-content hover:text-base-content/70 font-medium">
              Home
            </Link>
            <Link to="/my-sessions" className="text-base-content hover:text-base-content/70 font-medium">
              My Sessions
            </Link>
            <Link to="/editor" className="text-base-content hover:text-base-content/70 font-medium">
              Create Session
            </Link>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-base-content">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-neutral text-neutral-content px-4 py-2 rounded-full font-heading transition-all duration-200 transform hover:scale-102"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-base-content hover:text-base-content/70"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-sm rounded-lg mt-2">
              <Link to="/" className="block px-3 py-2 text-base-content hover:text-base-content/70">Home</Link>
              <Link to="/my-sessions" className="block px-3 py-2 text-base-content hover:text-base-content/70">My Sessions</Link>
              <Link to="/editor" className="block px-3 py-2 text-base-content hover:text-base-content/70">Create Session</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
