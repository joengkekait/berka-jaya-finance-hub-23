
import { Car, Ship, UtensilsCrossed, DollarSign } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import DashboardCard from '../components/dashboard/DashboardCard';
import FinancialChart from '../components/dashboard/FinancialChart';

const DashboardPage = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Dashboard</h1>
        <p className="text-gray-500">Ringkasan keuangan Berkah Jaya Transport</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Total Pendapatan"
          value="Rp 15,200,000"
          icon={<DollarSign className="h-6 w-6" />}
          change={12}
        />
        
        <DashboardCard
          title="Pendapatan Mobil"
          value="Rp 5,500,000"
          icon={<Car className="h-6 w-6" />}
          change={8}
        />
        
        <DashboardCard
          title="Pendapatan Speedboat"
          value="Rp 4,800,000"
          icon={<Ship className="h-6 w-6" />}
          change={-3}
        />
        
        <DashboardCard
          title="Pendapatan Restoran"
          value="Rp 4,900,000"
          icon={<UtensilsCrossed className="h-6 w-6" />}
          change={15}
        />
      </div>
      
      <FinancialChart />
    </AppLayout>
  );
};

export default DashboardPage;
