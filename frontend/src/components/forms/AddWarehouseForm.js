import '../../App.css';
import React, { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Button from '../button';

const AddWarehouseForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        psc: '',
        city: '',
      });

      useEffect(() => {
        if (data) {
          setFormData({
            name: data.name,
            phone: data.phone,
            address: data.address,
            psc: data.psc,
            city: data.city,
          });
        }
      }, [data]);
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]:value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='form'>
        <h2>Sklad</h2>
        <Input placeholder='Zadej název skladu...' name='name' type='text' label='Název skladu' onChange={handleInputChange} value={formData.name}/>
        <Input placeholder='Zadej telefon skladu...' name='phone' type='text' label='Telefon skladu' onChange={handleInputChange} value={formData.phone}/>
        <Input placeholder='Zadej adresu skladu...' name='address' type='text' label='Adresa skladu' onChange={handleInputChange} value={formData.address}/>
        <Input placeholder='Zadej PSČ skladu...' name='psc' type='number' label='Poštovní směrovací číslo skladu' onChange={handleInputChange} value={formData.psc}/>
        <Input placeholder='Zadej město skladu...' name='city' type='text' label='Město skladu' onChange={handleInputChange} value={formData.city}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
    </form>
  );
}
export default AddWarehouseForm;