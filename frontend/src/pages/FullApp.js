import '../App.css';
import '../responsive.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './ProductsPage';
import OrderPage from './OrderPage';
import CategoryPage from './CategoryPage';
import AddCategoryPage from './AddCategoryPage';
import StoragePage from './StoragePage';
import UpdateStoragePage from './StorageDetailPage';
import AddProductPage from './AddProductPage';
import SupplierPage from './SupplierPage';
import AddSupplierPage from './AddSupplierPage';
import EmployeePage from './EmployeePage';
import AddEmployeePage from './AddEmployee';
import StockPage from './StockPage';
import PositionPage from './PositionPage';
import MovementsPage from './MovementsPage';
import StockOutPage from './StockOutPage';
import TasksPage from './TasksPage';
import InventoriesPage from './InventoriesPage';
import StockMovementDetail from './StockMovementDetail';
import InventoryPage from './InventoryPage';

const FullApp = () => {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="Content">
        <Routes>
          <Route path='/products' element={<ProductPage />} />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/add-product' element={<AddProductPage />} />
          <Route path='/add-product/:id' element={<AddProductPage />} />
          <Route path='/add-product/:id/:storageId' element={<AddProductPage />} />
          <Route path='/stock' element={<StockPage />} />
          <Route path='/stock/:id' element={<StockPage />} />
          <Route path='/movements' element={<MovementsPage />} />
          <Route path='/stockout' element={<StockOutPage />} />
          <Route path='/stockout/:id' element={<StockOutPage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/inventories' element={<InventoriesPage />} />
          <Route path='/movement/:id' element={<StockMovementDetail />} />
          <Route path='/inventory/:id' element={<InventoryPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default FullApp;