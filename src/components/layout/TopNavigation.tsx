
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, LogOut, PlusCircle } from 'lucide-react';

const TopNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    localStorage.removeItem('bjt-auth');
    window.location.href = '/login';
  };

  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/650331d2-8d4f-4df4-ab41-421943a1032a.png" 
          alt="Berkah Jaya Transport" 
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-xl font-montserrat font-bold text-bjt-blue-dark">BJT Finance</h1>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link 
          to="/dashboard" 
          className={`bjt-nav-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <BarChart3 className="nav-icon" />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/input" 
          className={`bjt-nav-item ${isActive('/input') ? 'active' : ''}`}
        >
          <PlusCircle className="nav-icon" />
          <span>Input Data</span>
        </Link>
        
        <Link 
          to="/reports" 
          className={`bjt-nav-item ${isActive('/reports') ? 'active' : ''}`}
        >
          <FileText className="nav-icon" />
          <span>Laporan Keuangan</span>
        </Link>
      </div>
      
      <button 
        onClick={handleLogout}
        className="flex items-center text-red-500 hover:text-red-700 transition-colors"
      >
        <LogOut className="h-5 w-5 mr-1" />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default TopNavigation;
