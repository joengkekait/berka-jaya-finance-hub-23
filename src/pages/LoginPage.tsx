
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Silakan masukkan username dan password');
      return;
    }
    
    setLoading(true);
    
    // Simulate authentication
    // In a real app, this would be an API call to the backend
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Store auth token (in a real app, this would be a JWT token)
        localStorage.setItem('bjt-auth', 'true');
        toast.success('Login berhasil!');
        navigate('/dashboard');
      } else {
        toast.error('Username atau password salah');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bjt-gradient p-4">
      {/* Watermark Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-white text-[300px] font-bold">BJT</div>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-bjt shadow-bjt p-8 relative animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full shadow-lg overflow-hidden h-20 w-20">
            <img 
              src="/lovable-uploads/650331d2-8d4f-4df4-ab41-421943a1032a.png" 
              alt="Berkah Jaya Transport Logo" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-bjt-blue-dark mb-2">
          BJT Finance
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sistem Manajemen Keuangan Berkah Jaya Transport
        </p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="bjt-input pl-10"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bjt-input pl-10"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-bjt-gradient text-white font-semibold py-2 rounded-bjt shadow-bjt 
                     transition-all duration-200 hover:shadow-lg hover:bg-bjt-blue hover:scale-105"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For demo, use: admin / admin</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
