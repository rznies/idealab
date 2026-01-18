import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Plus, User, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-lab-ink flex flex-col bg-lab-bg bg-fixed relative selection:bg-lab-yellow/30">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 bg-dot-pattern opacity-30 pointer-events-none" />
      
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isLanding ? 'bg-lab-bg/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-md border-b border-lab-ink/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between relative">
            
            {/* Left: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8 z-10">
              <NavLink 
                to="/feed" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-black ${isActive ? 'text-black' : 'text-gray-500'}`
                }
              >
                Browse Ideas
              </NavLink>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-black ${isActive ? 'text-black' : 'text-gray-500'}`
                }
              >
                My Lab
              </NavLink>
            </div>

            {/* Center: Logo (Absolute to ensure true center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
              <Link to="/" className="text-2xl font-bold tracking-tight font-sans text-black hover:opacity-80 transition-opacity">
                IdeaLab
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-4 z-10">
              <Link to="/submit">
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-900 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:translate-y-0.5">
                  <Plus size={16} />
                  <span>Submit Idea</span>
                </button>
              </Link>
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors">
                <User size={18} />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center justify-between w-full">
               {/* Spacer to push logo to center if needed, or just keep simple layout for mobile */}
               <div /> 
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg p-4 flex flex-col gap-4 animate-slide-up">
            <NavLink to="/feed" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium py-2">Browse Ideas</NavLink>
            <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium py-2">My Lab</NavLink>
            <Link to="/submit" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-lab-blue font-bold py-2">
              <Plus size={16} /> Submit Idea
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>

      <footer className="border-t border-lab-ink/5 bg-lab-bg mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center">
          <p className="text-xl font-bold font-sans mb-4">IdeaLab</p>
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500">
            <Link to="/feed" className="hover:text-black">Browse</Link>
            <Link to="/submit" className="hover:text-black">Submit</Link>
            <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            © 2024 IdeaLab. "Ideas won't keep; something must be done about them."
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;