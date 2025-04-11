
import React, { useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';

interface MonthlyReportTableProps {
  filter?: string;
}

const MonthlyReportTable: React.FC<MonthlyReportTableProps> = ({ filter }) => {
  const [month, setMonth] = useState('April 2025');
  
  // Example data - in a real app, this would come from your API
  const data = [
    { date: '01/04/2025', asset: 'Avanza B 1234 CD', type: 'car', amount: 350000, category: 'income' },
    { date: '03/04/2025', asset: 'Speedboat SB-01', type: 'boat', amount: 1200000, category: 'income' },
    { date: '05/04/2025', asset: 'Restoran Pantai', type: 'restaurant', amount: 760000, category: 'income' },
    { date: '07/04/2025', asset: 'Pajak Tahunan', type: 'tax', amount: 500000, category: 'expense' },
    { date: '10/04/2025', asset: 'Bahan Bakar', type: 'fuel', amount: 300000, category: 'expense' },
    { date: '15/04/2025', asset: 'Gaji Karyawan', type: 'salary', amount: 1200000, category: 'expense' },
    { date: '20/04/2025', asset: 'Avanza B 1234 CD', type: 'car', amount: 450000, category: 'income' },
    { date: '25/04/2025', asset: 'Beban Listrik', type: 'utility', amount: 180000, category: 'expense' },
  ];
  
  // Filter data based on the filter prop
  const filteredData = filter ? data.filter(item => item.category === filter) : data;
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF or Excel file
    console.log('Downloading report for', month);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <button className="flex items-center text-sm font-medium bg-white rounded-md border border-gray-300 px-3 py-2">
            <span>{month}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          {/* Month selector would be implemented here */}
        </div>
        
        <button 
          onClick={handleDownload}
          className="flex items-center text-sm text-bjt-blue-dark bg-white rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-1" />
          <span>Download</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 border-b">Tanggal</th>
              <th className="px-4 py-3 border-b">Keterangan</th>
              <th className="px-4 py-3 border-b text-right">Jumlah (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{item.date}</td>
                <td className="px-4 py-3 text-sm">{item.asset}</td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${
                  item.category === 'income' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {item.category === 'income' ? '+' : '-'} {item.amount.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={2} className="px-4 py-3 text-sm">Total</td>
              <td className="px-4 py-3 text-sm text-right">
                {filteredData.reduce((sum, item) => {
                  if (item.category === 'income') {
                    return sum + item.amount;
                  } else {
                    return sum - item.amount;
                  }
                }, 0).toLocaleString('id-ID')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MonthlyReportTable;
