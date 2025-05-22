import '../App.css';
import '../responsive.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddProductForm from '../components/forms/AddProductForm';
import AddImagesForm from '../components/forms/AddImagesForm';
import { postData } from '../hooks/addToDb';
import useData from '../hooks/loadData';
import axios from 'axios';
import Image from '../components/Images';
import ProductStock from '../components/ProductStock';
import List from '../components/List';
import { useUser } from '../context/UserContext';
import { updateData } from '../hooks/updatetoDb';
import InfoHeader from '../components/InfoHeader';
import {fetchData} from '../hooks/fetchFunction';
import AlertBox from '../components/AlertBox';
import Position from '../components/Position';
import useDeleteData from '../hooks/deleteFunction';

const AddProductPage = () => {
const { id } = useParams();
const { storageId } = useParams();
const [productId, setProductId] = useState(id || null); // Inicializuj ID, pokud existuje
const [imgURL, setImgURL] = useState('');
const [alert, setAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState(true);
const [images, setImages] = useState([]);
const [product, setProduct] = useState([]);
const [positions, setPositions] = useState([]);
const { role } = useUser();
const [all_movements, setAllMovements] = useState([]);
const {deleteData} = useDeleteData();

useEffect(() => {
  const loadData = async () => {
    if (!id) return;

    try {
      // Načtení obrázků
      const imgs = await fetchData(`http://localhost:5000/images/${id}`);
      setImages(imgs);
      
      if(storageId && role === 3){
      const product_info = await fetchData(`http://localhost:5000/products/${id}`);
      setProduct(product_info);
      const all_positions = await fetchData(`http://localhost:5000/products/by-storage/${storageId}/product/${id}`);
      setPositions(all_positions);
      }
      else{
      const product_info = await fetchData(`http://localhost:5000/products/${id}`);
      setProduct(product_info);
      }
      
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }
  };

  loadData();
}, [id]);

const handleAddProduct = async (formData) => {
  console.log("Data přijatá z formuláře:", formData);
  if(id){
    const result = await updateData(`http://localhost:5000/products/${id}`, formData);
    setAlert(true);
    setAlertMessage(result);
  }
  else{
    try {
      const result = await postData('http://localhost:5000/products', formData);
      setAlert(true);
      setAlertMessage(result.message);
      if (result.productId) {
        setProductId(result.productId);
        console.log("Uložené productId:", result.data.productId);
      } else {
        console.error("Produkt nebyl uložen, chybí productId v odpovědi.");
      }
    } catch (error) {
      console.error("Chyba při ukládání produktu:", error);
    }
  }
};

const handleVisibility =(visible)=>{
  setAlert(visible);
  //goTo('/admin/categories');
}

useEffect(() => {
  if (!id) return;
  if (images && images.length > 0) {
    const newImgURL = 'http://localhost:5000/'+images[0].url.replace(/\\/g, '/');
    setImgURL(newImgURL);
    console.log(newImgURL); // Loguj přímo vypočtenou hodnotu
  }
}, [images]);


  const handleAddImages = async(formData) => {
    try {
      const response = await axios.post(`http://localhost:5000/images/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      console.log('Úspěšně odesláno:', response.data.message);
      setAlert(true);
      setAlertMessage(response.data.message);
      return response.data;
    } catch (error) {
      console.error('Chyba při odesílání:', error);
    }
  }

  useEffect(() => {
    const loadData = async () => {
    if (!id) return;
    if (role === 3) {
      if(storageId){
        const result = await fetchData(`http://localhost:5000/movements/${id}/storage/${storageId}`);
        setAllMovements(result);
        const all_positions = await fetchData(`http://localhost:5000/positions/by-storage/${storageId}/product/${id}`);
      setPositions(all_positions);
      } else{
        const result = await fetchData(`http://localhost:5000/movements/${id}`);
        setAllMovements(result);
      }
    }
    else{
      const result = await fetchData(`http://localhost:5000/movements/${id}/storage`);
      setAllMovements(result);
      const all_positions = await fetchData(`http://localhost:5000/positions/by-storage/${id}/product`);
      setPositions(all_positions); 
      }
    }
    loadData();
  }, [id]);

  const handleImgUrl =(url)=>{
      setImgURL(url);
      console.log(imgURL);
  }

  const HeaderTitles = [
    {name:'Zaměstnanec'},
    {name:'Počet položek'},
    {name:'Dodavatel'},
    {name:'Datum'},
    {name:'Typ'},
    {name:'Sklad'},
    {name:'Pozice'},
  ]

  const title = id ? 'Aktualizace produktu' : 'Přidání produktu';

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Opravdu chcete smazat tento záznam?");
    if (confirmed) {
      try {
        await deleteData(`http://localhost:5000/images/${id}`);
      } catch (err) {
        console.error('Chyba při mazání:', err);
      }
    } else {
      console.log("Mazání zrušeno");
    }
  };

  return (
    <div className="AddProductPage flex">
      {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/>)}
      <InfoHeader title={title}/>
        <div className='flex AddProductPageContainer'>
        <AddProductForm onSubmit={handleAddProduct} data={product}/> 
        {productId &&
         <div className='form' id='ImageBox'>
          <h2>Obrázky</h2>
          <div className='main-image'>
              <img src={imgURL} alt="" />
          </div>
         <div className='flex Images'>
         {
           images.map(image=>{
             return(
               <Image url={`http://localhost:5000/${image.url.replace(/\\/g, '/')}`} onClick={handleImgUrl} onDelete={()=>handleDelete(image.id)}/>
             )
           })
         }
         </div>
         {(productId && role === 3) && (<AddImagesForm onSubmit={handleAddImages} productId={productId} />)}
         </div>
        }
        </div>
        {(storageId || role === 4) && (
          <div className='positions flex'>
            <h2>Umístění</h2>
            <div className='positionsContainer flex'>
              {
                (positions || []).map(position => (
                  <Position 
                    key={position.id} // přidej unikátní `key` (např. `position.id`)
                    name={position.position.name} 
                    quantity={position.quantity} 
                  />
                ))
              }
          </div>
          </div>
        )}
        {productId && <List data={all_movements} titles={HeaderTitles} type={'moves_product'}/>}
    </div>
  );
}

export default AddProductPage;