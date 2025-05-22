import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Textarea from '../inputs/textarea';
import Button from '../button';

const CompanyForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        psc:'',
        city:''
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
                    address: data.address,
                    psc:data.psc,
                    city:data.city
                });
            }
      }, [data]);

      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Moje firma</h2>
        <Input placeholder='Zadej název firmy...' name='name' type='text' label='Název firmy' onChange={handleInputChange} value={formData.name}/>
        <Input placeholder='Zadej email na firmu...' name='email' type='email' label='Email firmy' onChange={handleInputChange} value = {formData.email}/>
        <Input placeholder='Zadej telefonní číslo firmy...' name='phone' type='text' label='Telefonní číslo firmy' onChange={handleInputChange} value={formData.phone}/>
        <Input placeholder='Zadej adresu firmy...' name='address' type='text' label='Adresa firmy' onChange={handleInputChange} value={formData.address}/>
        <Input placeholder='Zadej město firmy...' name='city' type='text' label='Město firmy' onChange={handleInputChange} value={formData.city}/>
        <Input placeholder='Zadej PSČ firmy...' name='zip' type='text' label='PSČ' onChange={handleInputChange} value={formData.psc}/>
        <Button type='submit' label='Uložit' style='button addButton' />
    </form>
  );
}
export default CompanyForm;