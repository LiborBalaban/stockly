import '../App.css';
import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { postData } from '../hooks/addToDb';
import { updateData } from '../hooks/updatetoDb';
import useData from '../hooks/loadData';
import AddWarehouseForm from '../components/forms/AddWarehouseForm';
import { fetchData } from "../hooks/fetchFunction";
import InfoHeader from '../components/InfoHeader';
import AlertBox from '../components/AlertBox';

const StorageDetailPage = () => {
  const { id } = useParams();
  const [warehouse, setWarehouse] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const title = id ? 'Aktualizace skladu' : 'Přidání skladu';

  const handleAddWarehouse = async(formData) => {
    console.log("Data přijatá z formuláře:", formData);

    if(id){
      const result = await updateData(`http://localhost:5000/warehouses/${id}`, formData);
      setAlert(true);
      setAlertMessage(result)
    } else{
      const result = await postData('http://localhost:5000/warehouses', formData);
      console.log(formData);
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
          const warehouse_info = await fetchData(`http://localhost:5000/warehouses/${id}`);
          setWarehouse(warehouse_info);
          
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
        <AddWarehouseForm onSubmit={handleAddWarehouse} data = {warehouse}/>
    </div>
  );
}

export default StorageDetailPage;