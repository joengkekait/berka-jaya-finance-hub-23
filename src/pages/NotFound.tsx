
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-bjt-background">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-bjt-blue-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bjt-button"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
