
import { useState } from 'react';
import { Calendar, DollarSign, Save } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '../components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ExpensesPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState({
    employeeSalary: '',
    nightGuardSalary: '',
    electricityBill: '',
    waterBill: '',
    internetBill: '',
    otherExpenses: '',
  });
  
  // In a real app, this would come from an API
  const availableCash = 5000000;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenses({
      ...expenses,
      [name]: value,
    });
  };
  
  const calculateTotal = () => {
    const values = Object.values(expenses).map(val => parseInt(val) || 0);
    return values.reduce((sum, val) => sum + val, 0);
  };
  
  const totalExpenses = calculateTotal();
  const isExceedingCash = totalExpenses > availableCash;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isExceedingCash) {
      toast.error('Pengeluaran melebihi kas yang tersedia');
      return;
    }
    
    if (totalExpenses === 0) {
      toast.error('Masukkan jumlah pengeluaran');
      return;
    }
    
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      toast.success('Data pengeluaran berhasil disimpan');
      // Reset form or redirect
      setLoading(false);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Beban Pengeluaran</h1>
        <p className="text-gray-500">Input pengeluaran bulanan</p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bjt-card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm font-medium text-bjt-blue-dark mb-1">Bulan/Tahun</div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="month"
                  value={selectedDate.substring(0, 7)}
                  onChange={(e) => setSelectedDate(`${e.target.value}-01`)}
                  className="bjt-input pl-10"
                />
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-bjt-blue-dark mb-1">Kas Tersedia</div>
              <div className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50">
                <span className="font-medium">Rp {availableCash.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <Label htmlFor="employeeSalary" className="text-bjt-blue-dark">
                  Gaji Karyawan
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="employeeSalary"
                    name="employeeSalary"
                    type="number"
                    placeholder="0"
                    value={expenses.employeeSalary}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="nightGuardSalary" className="text-bjt-blue-dark">
                  Gaji Penjaga Malam
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="nightGuardSalary"
                    name="nightGuardSalary"
                    type="number"
                    placeholder="0"
                    value={expenses.nightGuardSalary}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="electricityBill" className="text-bjt-blue-dark">
                  Beban Listrik
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="electricityBill"
                    name="electricityBill"
                    type="number"
                    placeholder="0"
                    value={expenses.electricityBill}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="waterBill" className="text-bjt-blue-dark">
                  Beban PDAM
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="waterBill"
                    name="waterBill"
                    type="number"
                    placeholder="0"
                    value={expenses.waterBill}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="internetBill" className="text-bjt-blue-dark">
                  Beban Internet
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="internetBill"
                    name="internetBill"
                    type="number"
                    placeholder="0"
                    value={expenses.internetBill}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="otherExpenses" className="text-bjt-blue-dark">
                  Beban Lain-lain
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="otherExpenses"
                    name="otherExpenses"
                    type="number"
                    placeholder="0"
                    value={expenses.otherExpenses}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-bjt-blue-dark">Total Pengeluaran:</span>
                <span className={`text-lg font-bold ${isExceedingCash ? 'text-red-500' : 'text-bjt-blue-dark'}`}>
                  Rp {totalExpenses.toLocaleString('id-ID')}
                </span>
              </div>
              
              {isExceedingCash && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                  Peringatan: Total pengeluaran melebihi kas yang tersedia
                </div>
              )}
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading || isExceedingCash}
                  className="flex items-center gap-2 bg-bjt-gradient text-white font-semibold py-2 px-6 rounded-bjt shadow-bjt
                           transition-all duration-200 hover:shadow-lg hover:bg-bjt-blue hover:scale-105
                           disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Save className="h-5 w-5" />
                  {loading ? 'Menyimpan...' : 'Simpan Pengeluaran'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExpensesPage;
