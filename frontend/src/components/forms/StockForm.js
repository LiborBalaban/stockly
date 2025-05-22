import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';
import { fetchData } from '../../hooks/fetchFunction';
import { useUser } from '../../context/UserContext';

const StockForm = ({onSubmit, handleStorage, type , onSubmitExpectedDelivery , data}) => {
    const { data:suppliers} = useData('http://localhost:5000/suppliers'); 
    const { data:storages} = useData('http://localhost:5000/warehouses'); 
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        supplierId:'',
        description:'',
        invoiceNumber:'',
        storageId:'',
        userId:'',
      });


  useEffect(() => {
  if (data) {
    setFormData({
      supplierId: data.supplierId ?? '',
      description: data.description ?? '',
      invoiceNumber: data.invoiceNumber ?? '',
      storageId: data.storageId ?? '',
      userId: data.uploadedById ?? '', // nebo data.userId pokud používáš jiné pole
    });
  }
}, [data]);


      console.log("handleStorageId v StockPage:", handleStorage);
      const { role } = useUser();
      
      useEffect(() => {
      const fetchUsers = async () => {
    if (!formData.storageId) return;

    try {
      const res = await fetchData(`http://localhost:5000/users/storage/${formData.storageId}`);
      setUsers(res);
    } catch (err) {
      console.error('Chyba při načítání uživatelů:', err);
    }
  };

  fetchUsers();
}, [formData.storageId]);


      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectSupplier = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          supplierId: selectedId ?? '',
        }));
      };

      const handleSelectUser = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          userId: selectedId ?? '',
        }));
      };

      const handleSelectStorage = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          storageId: selectedId,
        }));
        
        if (handleStorage) {
          handleStorage(selectedId);  // Tento log zkontroluje, zda je funkce volána
        } else {
          console.log("handleStorage je undefined");  // Tento log by měl ukázat, jestli je funkce undefined
        }
      };

  return (
    <form className='StockForm flex'>
        {role === 3 && (<Select data={storages} label={'Sklad'} onSelect={handleSelectStorage} selected={formData.storageId}/> )}
        {type === 'stockin' && (<Select data={suppliers} label={'Dodavatelé'} onSelect={handleSelectSupplier} selected={formData.supplierId}/>)} 
        <Textarea label={'Popis'} placeholder={'Popis Naskladnění'} name={'description'} onChange={handleInputChange}/>
        <Input label={'Číslo dokladu'} type={'number'} name={'invoiceNumber'} onChange={handleInputChange} value={formData.invoiceNumber}/>
        {role === 3 && (<Select data={users} label={'Vyberte uživatele'} onSelect={handleSelectUser} selected={formData.userId}/> )}
        <div className='flex flex-100'>
        <Button label={'Naskladnit'} style={'button addButton'} type={'button'} onClick={()=>onSubmit(formData)}/>
        {role === 3 && <Button label={'Očekávané naskladnění'} type={'button'} style={'button secondButton'} onClick={()=>onSubmitExpectedDelivery(formData)}/>}
        </div>
    </form>
  );
}
export default StockForm;