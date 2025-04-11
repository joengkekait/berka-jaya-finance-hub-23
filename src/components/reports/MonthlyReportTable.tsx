
import { useState } from 'react';
import { Download, Filter } from 'lucide-react';

// Sample data
const reportData = [
  { id: 1, date: '2023-04-01', type: 'car', description: 'Sewa Mobil Toyota Avanza', amount: 500000, transactionType: 'income' },
  { id: 2, date: '2023-04-02', type: 'boat', description: 'Sewa Speedboat 4 jam', amount: 1500000, transactionType: 'income' },
  { id: 3, date: '2023-04-03', type: 'restaurant', description: 'Pendapatan Restoran', amount: 2500000, transactionType: 'income' },
  { id: 4, date: '2023-04-05', type: 'car', description: 'Perawatan Mobil', amount: 250000, transactionType: 'expense' },
  { id: 5, date: '2023-04-10', type: 'restaurant', description: 'Belanja Bahan Makanan', amount: 1500000, transactionType: 'expense' },
  { id: 6, date: '2023-04-15', type: 'boat', description: 'Perbaikan Mesin Speedboat', amount: 750000, transactionType: 'expense' },
];

const MonthlyReportTable = () => {
  const [filter, setFilter] = useState('all');
  const [month, setMonth] = useState('2023-04');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'car': return 'Mobil';
      case 'boat': return 'Speedboat';
      case 'restaurant': return 'Restoran';
      default: return type;
    }
  };
  
  const filteredData = reportData.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'income') return item.transactionType === 'income';
    if (filter === 'expense') return item.transactionType === 'expense';
    return item.type === filter;
  });
  
  // Calculate summary
  const totalIncome = filteredData
    .filter(item => item.transactionType === 'income')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalExpense = filteredData
    .filter(item => item.transactionType === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const netIncome = totalIncome - totalExpense;

  return (
    <div className="bjt-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-semibold text-bjt-blue-dark mb-4 md:mb-0">
          Laporan Keuangan Bulanan
        </h2>
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="flex items-center">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bjt-input w-full md:w-auto"
            />
          </div>
          
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bjt-input pl-10 w-full md:w-auto"
            >
              <option value="all">Semua Transaksi</option>
              <option value="income">Pendapatan</option>
              <option value="expense">Pengeluaran</option>
              <option value="car">Mobil</option>
              <option value="boat">Speedboat</option>
              <option value="restaurant">Restoran</option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <button className="bjt-button flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-bjt border border-green-200">
          <h3 className="text-sm text-green-700 font-medium">Total Pendapatan</h3>
          <p className="text-xl font-bold text-green-800">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-bjt border border-red-200">
          <h3 className="text-sm text-red-700 font-medium">Total Pengeluaran</h3>
          <p className="text-xl font-bold text-red-800">{formatCurrency(totalExpense)}</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-bjt border border-blue-200">
          <h3 className="text-sm text-blue-700 font-medium">Laba Bersih</h3>
          <p className={`text-xl font-bold ${netIncome >= 0 ? 'text-blue-800' : 'text-red-600'}`}>
            {formatCurrency(netIncome)}
          </p>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keterangan
              </th>
              <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jumlah
              </th>
              <th className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jenis
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {getTypeLabel(item.type)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                  {formatCurrency(item.amount)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.transactionType === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.transactionType === 'income' ? 'Pendapatan' : 'Pengeluaran'}
                  </span>
                </td>
              </tr>
            ))}
            
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Tidak ada data yang sesuai dengan filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportTable;
