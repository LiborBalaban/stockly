import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import CompanyForm from '../components/forms/CompanyForm';
import InfoHeader from '../components/InfoHeader';
import AlertBox from '../components/AlertBox';


const CompanyDetail = () => {
const [alert, setAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const { data:company, loading, error } = useData(`http://localhost:5000/company`); 
const title = 'Informace o firmě';
  
const handleUpdateCompany = async(formData) => {
    console.log("Data přijatá z formuláře:", formData);
    const result = await updateData(`http://localhost:5000/company/update`, formData);
    setAlert(true);
    setAlertMessage(result);
  };

  const handleVisibility =(visible)=>{
    setAlert(visible);
  }
 
  return (
    <div className="page flex">  
     {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
    <InfoHeader title={title}/>   
    <CompanyForm onSubmit = {handleUpdateCompany} data={company}/>       
    </div>
  );
}

export default CompanyDetail;