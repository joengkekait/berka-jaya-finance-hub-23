
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Sample data - in a real app, this would come from an API
const data = [
  { name: 'Jan', pendapatan: 2400, pengeluaran: 1800 },
  { name: 'Feb', pendapatan: 2800, pengeluaran: 2000 },
  { name: 'Mar', pendapatan: 3200, pengeluaran: 2400 },
  { name: 'Apr', pendapatan: 2900, pengeluaran: 1900 },
  { name: 'Mei', pendapatan: 3500, pengeluaran: 2500 },
  { name: 'Jun', pendapatan: 3800, pengeluaran: 2600 }
];

const FinancialChart = () => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bjt-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Keuangan Bulanan</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setChartType('area')}
            className={`px-3 py-1 text-sm rounded-bjt ${
              chartType === 'area' 
                ? 'bg-bjt-gradient text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 text-sm rounded-bjt ${
              chartType === 'bar' 
                ? 'bg-bjt-gradient text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F4A1A1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F4A1A1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `Rp${value / 1000}K`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
              />
              <Area 
                type="monotone" 
                dataKey="pendapatan" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorPendapatan)" 
              />
              <Area 
                type="monotone" 
                dataKey="pengeluaran" 
                stroke="#F4A1A1" 
                fillOpacity={1} 
                fill="url(#colorPengeluaran)" 
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                tickFormatter={(value) => `Rp${value / 1000}K`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
              />
              <Legend />
              <Bar 
                name="Pendapatan" 
                dataKey="pendapatan" 
                fill="#10B981" 
              />
              <Bar 
                name="Pengeluaran" 
                dataKey="pengeluaran" 
                fill="#F4A1A1" 
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialChart;
