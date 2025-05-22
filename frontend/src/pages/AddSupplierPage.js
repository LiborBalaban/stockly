import '../App.css';
import '../responsive.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSupplierForm from '../components/forms/AddSupplierForm';
import useData from '../hooks/loadData';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import InfoHeader from '../components/InfoHeader';
import { fetchData } from "../hooks/fetchFunction";
import AlertBox from '../components/AlertBox';

const AddSupplierPage = () => {
  const {id} = useParams();
  const [supplier, setSupplier] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const title = id ? 'Aktualizace dodavatele' : 'Přidání dodavatele';
  const handleSupplierSave = async(formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      const result = await updateData(`http://localhost:5000/suppliers/${id}`, formData);
      setAlert(true);
      setAlertMessage(result);
    } else{
      const result = await postData('http://localhost:5000/suppliers', formData);
      setAlert(true);
      setAlertMessage(result.message);
    }
    };

    const handleVisibility =(visible)=>{
      setAlert(visible);
    }

    useEffect(() => {
      const loadData = async () => {
        if (!id) return;
    
        try {
          // Načtení obrázků
          const supplier_info = await fetchData(`http://localhost:5000/suppliers/${id}`);
          setSupplier(supplier_info);
          
        } catch (error) {
          console.error("Chyba při načítání dat:", error);
        }
      };
    
      loadData();
    }, [id]);
 

  return (
    <div className="page flex">
      {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/> )}
      <InfoHeader title={title}/>
       <AddSupplierForm onSubmit={handleSupplierSave} data = {supplier}/>
    </div>
  );
}

export default AddSupplierPage;