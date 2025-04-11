
import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AppLayout from '../components/layout/AppLayout';
import MonthlyReportTable from '../components/reports/MonthlyReportTable';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Laporan Keuangan</h1>
        <p className="text-gray-500">Laporan pendapatan dan pengeluaran</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="income">Pendapatan</TabsTrigger>
          <TabsTrigger value="expenses">Pengeluaran</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="bjt-card">
            <h2 className="text-xl font-semibold mb-4 text-bjt-blue-dark">
              Ringkasan Keuangan
            </h2>
            <MonthlyReportTable />
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-6">
          <div className="bjt-card">
            <h2 className="text-xl font-semibold mb-4 text-bjt-blue-dark">
              Detail Pendapatan
            </h2>
            <MonthlyReportTable filter="income" />
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-6">
          <div className="bjt-card">
            <h2 className="text-xl font-semibold mb-4 text-bjt-blue-dark">
              Detail Pengeluaran
            </h2>
            <MonthlyReportTable filter="expense" />
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default ReportsPage;
