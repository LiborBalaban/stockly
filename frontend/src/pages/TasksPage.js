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


function TasksPage() {

  const { goTo } = useCustomNavigate();
  const {deleteData} = useDeleteData();
  const { data:expectedDeliveries, loading, error } = useData('http://localhost:5000/expected-delivery/user'); 
  const [filtredDeliveries, setFiltredDeliveries] = useState([]);

 const HeaderTitles = [
  {name:'Název'},
  {name:'Akce'},
]

useEffect(() => {
  setFiltredDeliveries(expectedDeliveries || []);
}, [expectedDeliveries]); 


const hadnleFilteredData =(data)=>{
  setFiltredDeliveries(data);
}

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

  if (loading) return <p>Načítám kategorie...</p>;
  if (error) return <p>{error}</p>;

 
  return (
    <div className="page">
        <div className='page-header'>
        <h2>Očekávané dodávky</h2>
        </div>
        <Header data={filtredDeliveries} getFiltred={hadnleFilteredData} label={'Vyhledat kategorii'}/>
        <List data={filtredDeliveries} titles={HeaderTitles} type={'tasks'} deleteFunction={handleDelete}/>
    </div>
  );
}

export default TasksPage;