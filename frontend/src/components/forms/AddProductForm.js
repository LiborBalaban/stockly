import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';
import useData from '../../hooks/loadData';
import { useUser } from '../../context/UserContext';

const AddProductForm = ({onSubmit, data}) => {
  const { role } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        categoryId: '',
        code: '',
      });

      useEffect(() => {
                    if (data) {
                      setFormData({
                        name: data.name,
                        description: data.description,
                        quantity: data.totalStock,
                        categoryId: data.categoryId,
                        code: data.code,
                      });
                    }
                  }, [data]);

      const { data:categories, loading, error } = useData('http://localhost:5000/categories'); 
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSelectCategory = (selectedId) => {
        setFormData((prevData) => ({
          ...prevData,
          categoryId: selectedId,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Produkt</h2>
        <Input placeholder='Zadej název produktu...' name='name' type='text' label='Název produktu' onChange={handleInputChange} value={formData.name}/>
        <Textarea placeholder='Zadejte informace o produktu...' name = 'description' label='Popis produktu' onChange={handleInputChange} value={formData.description}/>
        <Input placeholder='Zadej kód produktu...' name='code' type='number' label='Kód produktu' onChange={handleInputChange} value={formData.code}/>
        <div className='form-block'>
        <Select label='Vyber kategorii' data={categories} onSelect={handleSelectCategory} selected={formData.categoryId}/>
        <Input placeholder='Zadej množství produktu...' name='quantity' type='number' label='Množství' onChange={handleInputChange} value={formData.quantity}/>
        </div>
        {role === 3 && (<Button type='submit' label='Uložit' style='button addButton'/>)}
    </form>
  );
}
export default AddProductForm;