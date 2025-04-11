
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, FileText, LogOut, PlusCircle, DollarSign } from 'lucide-react';

const BottomNavigation = () => {
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex items-center justify-around">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center p-3 ${isActive('/dashboard') ? 'text-bjt-blue border-t-2 border-bjt-gold' : 'text-gray-600'}`}
        >
          <BarChart3 className="h-6 w-6" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        
        <Link 
          to="/input" 
          className={`flex flex-col items-center p-3 ${isActive('/input') ? 'text-bjt-blue border-t-2 border-bjt-gold' : 'text-gray-600'}`}
        >
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Input</span>
        </Link>
        
        <Link 
          to="/expenses" 
          className={`flex flex-col items-center p-3 ${isActive('/expenses') ? 'text-bjt-blue border-t-2 border-bjt-gold' : 'text-gray-600'}`}
        >
          <DollarSign className="h-6 w-6" />
          <span className="text-xs mt-1">Beban</span>
        </Link>
        
        <Link 
          to="/reports" 
          className={`flex flex-col items-center p-3 ${isActive('/reports') ? 'text-bjt-blue border-t-2 border-bjt-gold' : 'text-gray-600'}`}
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs mt-1">Laporan</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="flex flex-col items-center p-3 text-red-500"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs mt-1">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;
