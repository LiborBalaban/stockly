import '../App.css';
import '../responsive.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../components/button';
import Item from '../components/item';
import useData from '../hooks/loadData';
import useCustomNavigate from '../hooks/navigate';
import List from '../components/List';
import Header from '../components/Header';
import useDeleteData from '../hooks/deleteFunction';
import InventoryForm from '../components/forms/AddInventoryForm';
import AlertBox from '../components/AlertBox';
import { postData } from '../hooks/addToDb';
import { useUser } from '../context/UserContext';
import { fetchData } from '../hooks/fetchFunction';


function InventoriesPage() {

  const { goTo } = useCustomNavigate();
  const {deleteData} = useDeleteData();
  const [inventory, setInventory] = useState([]);
  const [filtredInventory, setFiltredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { role } = useUser();

 const HeaderTitles = [
  {name:'Název'},
  {name:'Akce'},
]


useEffect(() => {
  const fetchInventory = async () => {
    try {
      let result;
      if (role === 4) {
        result = await fetchData('http://localhost:5000/inventory/storage');
      } else {
        result = await fetchData('http://localhost:5000/inventory');
      }
      setInventory(result);
      setFiltredInventory(result);
    } catch (err) {
      console.log('Chyba při načítání dat');
    }
  };

  fetchInventory();
}, [role]);


const hadnleFilteredData =(data)=>{
  setFiltredInventory(data);
}

const handleSubmit= async(formData) => {
        console.log("Data přijatá z formuláře:", formData);
        
        const result = await postData('http://localhost:5000/inventory', formData);
        setAlert(true);
        setAlertMessage(result.message);
      };

const handleDelete = async (url) => {
  const confirmed = window.confirm("Opravdu chcete smazat tento záznam?");
  if (confirmed) {
    try {
      await deleteData(url);
    } catch (err) {
      console.error('Chyba při mazání:', err);
    }
  } else {
    console.log("Mazání zrušeno");
  }
};

 const handleVisibility =(visible)=>{
        setAlert(visible);
        //goTo('/admin/categories');
      }



 
  return (
    <div className="page">
        {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/>)}
        <div className='page-header'>
        <h2>Inventury</h2>
        {role === 3 && <Button label = 'Přidat' onClick={() => setOpen(true)} style={'button addButton'} type={('button')}/>}
        </div>
        {open && (
        <InventoryForm onSubmit={handleSubmit}/>
        )}
        <Header data={inventory} getFiltred={hadnleFilteredData} label={'Vyhledat inventuru'}/>
        <List data={filtredInventory} titles={HeaderTitles} type={'inventories'} deleteFunction={handleDelete}/>
    </div>
  );
}

export default InventoriesPage;