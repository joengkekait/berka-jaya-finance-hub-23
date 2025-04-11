
import { useState } from 'react';
import { Calendar, Save, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '../components/layout/AppLayout';
import { Input } from '@/components/ui/input';

// In a real app, this would be an API call
const saveExpenses = (data: any) => {
  // Simulate API delay
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Expenses saved:', data);
      resolve();
    }, 1000);
  });
};

// Calculate available cash - in real app this would come from API
const getAvailableCash = () => 25000000; // Rp 25,000,000 as example

const ExpensesPage = () => {
  const [month, setMonth] = useState<string>(new Date().toISOString().split('T')[0].substring(0, 7));
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeSalaries: '',
    nightGuardSalary: '',
    electricityBill: '',
    waterBill: '',
    internetBill: '',
    otherExpenses: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalExpenses = () => {
    const total = Object.values(formData).reduce((sum, value) => {
      const numValue = value ? parseInt(value, 10) : 0;
      return sum + numValue;
    }, 0);
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalExpenses = calculateTotalExpenses();
    const availableCash = getAvailableCash();
    
    if (totalExpenses > availableCash) {
      toast.error('Total pengeluaran tidak boleh melebihi kas tersedia');
      return;
    }
    
    setLoading(true);
    try {
      await saveExpenses({
        month,
        ...formData,
        totalExpenses
      });
      toast.success('Data pengeluaran berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan data pengeluaran');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const totalExpenses = calculateTotalExpenses();
  const availableCash = getAvailableCash();
  const remainingCash = availableCash - totalExpenses;

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Beban Pengeluaran</h1>
        <p className="text-gray-500">Input pengeluaran bulanan</p>
      </div>
      
      <div className="bjt-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold text-bjt-blue-dark mb-4 md:mb-0">
            Input Beban Bulanan
          </h2>
          
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bjt-input pl-10 w-full md:w-auto"
            />
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-bjt border border-blue-200">
            <h3 className="text-sm text-blue-700 font-medium">Kas Tersedia</h3>
            <p className="text-xl font-bold text-blue-800">{formatCurrency(availableCash)}</p>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-bjt border border-red-200">
            <h3 className="text-sm text-red-700 font-medium">Total Pengeluaran</h3>
            <p className="text-xl font-bold text-red-800">{formatCurrency(totalExpenses)}</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-bjt border border-green-200">
            <h3 className="text-sm text-green-700 font-medium">Sisa Kas</h3>
            <p className="text-xl font-bold text-green-800">{formatCurrency(remainingCash)}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="employeeSalaries" className="block text-sm font-medium text-gray-700 mb-1">
                Gaji Karyawan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="employeeSalaries"
                  name="employeeSalaries"
                  value={formData.employeeSalaries}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="nightGuardSalary" className="block text-sm font-medium text-gray-700 mb-1">
                Gaji Penjaga Malam
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="nightGuardSalary"
                  name="nightGuardSalary"
                  value={formData.nightGuardSalary}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="electricityBill" className="block text-sm font-medium text-gray-700 mb-1">
                Beban Listrik
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="electricityBill"
                  name="electricityBill"
                  value={formData.electricityBill}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="waterBill" className="block text-sm font-medium text-gray-700 mb-1">
                Beban PDAM
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="waterBill"
                  name="waterBill"
                  value={formData.waterBill}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="internetBill" className="block text-sm font-medium text-gray-700 mb-1">
                Beban Internet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="internetBill"
                  name="internetBill"
                  value={formData.internetBill}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="otherExpenses" className="block text-sm font-medium text-gray-700 mb-1">
                Beban Lain-lain
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="number"
                  id="otherExpenses"
                  name="otherExpenses"
                  value={formData.otherExpenses}
                  onChange={handleChange}
                  placeholder="Jumlah dalam Rupiah"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading || totalExpenses > availableCash}
              className={`bjt-button w-full md:w-auto flex items-center justify-center gap-2 ${
                totalExpenses > availableCash ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Menyimpan...' : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Simpan Pengeluaran</span>
                </>
              )}
            </button>
          </div>
          
          {totalExpenses > availableCash && (
            <p className="text-red-500 text-center mt-2">
              Total pengeluaran tidak boleh melebihi kas tersedia
            </p>
          )}
        </form>
      </div>
    </AppLayout>
  );
};

export default ExpensesPage;
