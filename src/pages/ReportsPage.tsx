
import AppLayout from '../components/layout/AppLayout';
import MonthlyReportTable from '../components/reports/MonthlyReportTable';

const ReportsPage = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Laporan Keuangan</h1>
        <p className="text-gray-500">Laporan pendapatan dan pengeluaran</p>
      </div>
      
      <MonthlyReportTable />
    </AppLayout>
  );
};

export default ReportsPage;
