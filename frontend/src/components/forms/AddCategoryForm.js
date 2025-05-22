import '../../App.css';
import { useState, useEffect } from 'react';
import Input from '../inputs/input';
import Select from '../inputs/select';
import Textarea from '../inputs/textarea';
import Button from '../button';

const AddCategoryForm = ({onSubmit, data}) => {
    const [formData, setFormData] = useState({
        name: '',
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
        <h2>Kategorie</h2>
        <Input placeholder='Zadej název kategorie...' name='name' type='text' label='Název kategorie' onChange={handleInputChange} value={formData.name}/>
        <Textarea placeholder='Zadejte informace o kategorii...' name = 'description' label='Popis kategorie' onChange={handleInputChange} value={formData.description}/>
        <Button type='submit' label='Uložit' style='button addButton'/>
    </form>
  );
}
export default AddCategoryForm;