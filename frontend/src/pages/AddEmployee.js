import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AddEmployeeForm from '../components/forms/AddEmployeeForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import {useParams } from 'react-router-dom';
import InfoHeader from '../components/InfoHeader';
import { fetchData } from "../hooks/fetchFunction";
import AlertBox from '../components/AlertBox';

const AddEmployeePage = () => {
  const {id} = useParams();
  const [user, setUser] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
  
      try {
        // Načtení obrázků
        const user_info = await fetchData(`http://localhost:5000/users/${id}`);
        setUser(user_info);
        
      } catch (error) {
        console.error("Chyba při načítání dat:", error);
      }
    };
  
    loadData();
  }, [id]);

  const handleAddEmployee = async(formData) => {
      console.log("Data přijatá z formuláře:", formData);
      const result = await postData('http://localhost:5000/users', formData);
      setAlert(true);
      setAlertMessage(result.message);
    };

    const handleVisibility =(visible)=>{
      setAlert(visible);
    }

    const title = id ? 'Informace o zaměstnanci' : 'Přidání zaměstnance';

  return (
    <div className="page flex">
    {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
    <InfoHeader title={title}/>
    <AddEmployeeForm onSubmit={handleAddEmployee} data={user}/>
    </div>
  );
}

export default AddEmployeePage;