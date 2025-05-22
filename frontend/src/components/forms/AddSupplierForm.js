import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddSupplierForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
      });
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      useEffect(() => {
            if (data) {
                  setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    description: data.description,
                });
            }
      }, [data]);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Dodavatel</h2>
        <Input placeholder='Zadej název dodavatele...' name='name' type='text' label='Název dodavatele' onChange={handleInputChange} value={formData.name}/>
        <Input placeholder='Zadej email dodavatele...' name='email' type='email' label='Email dodavatele' onChange={handleInputChange} value = {formData.email}/>
        <Input placeholder='Zadej telefonní číslo dodavatele...' name='phone' type='text' label='Telefonní číslo dodavatele' onChange={handleInputChange} value={formData.phone}/>
        <Textarea placeholder='Zadejte informace o dodavateli...' name = 'description' label='Popis Dodavatele' onChange={handleInputChange} value={formData.description}/>
        <Button type='submit' label='Uložit' style='button addButton' />
    </form>
  );
}
export default AddSupplierForm;