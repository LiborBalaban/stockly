import '../App.css';
import '../responsive.css';
import SingUpEmployeeForm from '../components/forms/SingUpEmployeeForm';
import { postData } from '../hooks/addToDb';
import { useState } from 'react';
import AlertBox from '../components/AlertBox';

const SingupEmployeePage = () => {
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleSingUp = async(formData) => {
    console.log(formData);
    try {
      await  postData('http://localhost:5000/save-employee', formData);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setAlert(true);
        setAlertMessage(error.response.data.message);
      } else {
        setAlert(true);
        setAlertMessage('Nastala neočekávaná chyba.');
      }
    }
      };

      const handleVisibility =(visible)=>{
        setAlert(visible);
      }

  return (
    <div className="LoginPage flex">
       {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
        <div className='LoginDiv flex'>
            <SingUpEmployeeForm onSubmit={handleSingUp}/>
        </div>
    </div>
  );
}

export default SingupEmployeePage;