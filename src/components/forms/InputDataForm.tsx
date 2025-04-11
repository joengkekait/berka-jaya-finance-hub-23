
import { useState } from 'react';
import { 
  Car, 
  Ship, 
  UtensilsCrossed,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

// In a real app, this would be an API call
const saveTransaction = (data: any) => {
  // Simulate API delay
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Transaction saved:', data);
      resolve();
    }, 1000);
  });
};

const InputDataForm = () => {
  const [selectedType, setSelectedType] = useState<string>('car');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    type: 'car', // car, boat, restaurant
    transactionType: 'income', // income, expense
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'type') {
      setSelectedType(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.date) {
      toast.error('Silakan isi semua field yang diperlukan');
      return;
    }
    
    setLoading(true);
    try {
      await saveTransaction(formData);
      toast.success('Data berhasil disimpan');
      // Reset form
      setFormData({
        ...formData,
        amount: '',
        description: '',
      });
    } catch (error) {
      toast.error('Gagal menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bjt-card animate-fade-in">
      <h2 className="text-xl font-semibold mb-6 text-center text-bjt-blue-dark">
        Input Data Keuangan
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => {
            setSelectedType('car');
            setFormData({...formData, type: 'car'});
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-bjt ${
            selectedType === 'car' 
              ? 'bg-bjt-gradient text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Car className="h-5 w-5" />
          <span>Mobil</span>
        </button>
        
        <button
          type="button"
          onClick={() => {
            setSelectedType('boat');
            setFormData({...formData, type: 'boat'});
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-bjt ${
            selectedType === 'boat' 
              ? 'bg-bjt-gradient text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Ship className="h-5 w-5" />
          <span>Speedboat</span>
        </button>
        
        <button
          type="button"
          onClick={() => {
            setSelectedType('restaurant');
            setFormData({...formData, type: 'restaurant'});
          }}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-bjt ${
            selectedType === 'restaurant' 
              ? 'bg-bjt-gradient text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <span>Restoran</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bjt-input pl-10"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah (Rp)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Jumlah dalam Rupiah"
                className="bjt-input pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">
            Jenis Transaksi
          </label>
          <select
            id="transactionType"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="bjt-input"
          >
            <option value="income">Pendapatan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Keterangan
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tambahkan keterangan (opsional)"
            rows={3}
            className="bjt-input"
          />
        </div>
        
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bjt-button w-full md:w-auto"
          >
            {loading ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputDataForm;
