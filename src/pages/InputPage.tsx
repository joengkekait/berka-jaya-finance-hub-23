
import AppLayout from '../components/layout/AppLayout';
import InputDataForm from '../components/forms/InputDataForm';

const InputPage = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-bjt-blue-dark">Input Data</h1>
        <p className="text-gray-500">Tambahkan transaksi pendapatan atau pengeluaran</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <InputDataForm />
      </div>
    </AppLayout>
  );
};

export default InputPage;
