import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';
import { fetchData } from '../../hooks/fetchFunction';
import { useUser } from '../../context/UserContext';

const InventoryForm = ({onSubmit}) => {
    const { data:storages} = useData('http://localhost:5000/warehouses'); 
    const [formData, setFormData] = useState({
        name: '',
        storageId:'',
      });

    
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSelectStorage = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          storageId: selectedId,
        }));
      };

  return (
    <div className='background-form flex'>
    <form className='StockForm flex'>
        <Select data={storages} label={'Sklad'} onSelect={handleSelectStorage}/> 
        <Input label={'Název inventury'} type={'text'} name={'name'} onChange={handleInputChange}/>
        <Button label={'Vytvořit'} style={'button addButton'} type={'button'} onClick={()=>onSubmit(formData)}/>
    </form>
    </div>
  );
}
export default InventoryForm;