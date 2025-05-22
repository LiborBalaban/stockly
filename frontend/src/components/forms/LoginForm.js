import '../../App.css';
import { useState } from 'react';
import Input from '../inputs/input';
import Button from '../button';

const LoginForm = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      
      const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className='loginForm'>
        <Input placeholder='Zadej Váš email...' name='email' type='email' label='Váš Email' onChange={handleInputChange}/>
        <Input placeholder='Zadejte heslo' name='password' type='password' label='Heslo' onChange={handleInputChange}/>
        <div className='resetPasswordSpan flex'>
        <span>Zapomněli jste heslo?</span>
        </div>
        <Button type='submit' style='button addButton' label='Přihlásit se'/>
    </form>
  );
}
export default LoginForm;