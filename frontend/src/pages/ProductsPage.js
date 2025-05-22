import '../App.css';
import '../responsive.css';
import React, { useState, useEffect } from "react";
import Product from '../components/Product';
import Button from '../components/button';
import useCustomNavigate from '../hooks/navigate';
import Select from '../components/inputs/select';
import searchbar from '../Images/search-interface-symbol.png';
import useData from '../hooks/loadData';
import { useUser } from '../context/UserContext';
import Input from '../components/inputs/input';
import List from '../components/List';
import Header from '../components/Header';
import useDeleteData from '../hooks/deleteFunction';
import { fetchData } from "../hooks/fetchFunction"

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [storageId, setStorageId] = useState('');
  const [filtredProducts, setFiltredProducts] = useState([]);
  const { role } = useUser();
  const { deleteData } = useDeleteData();
  const { goTo } = useCustomNavigate();

  const { data: storages } = useData('http://localhost:5000/warehouses');
  const { data: all_products, loading: loadingProducts, error: errorProducts } = useData('http://localhost:5000/products/by-company');

  // Nastavení výchozích produktů
  useEffect(() => {
    if (all_products) {
      setProducts(all_products);
    }
  }, [all_products]);

  // Přepnutí produktů na základě role a skladu
  useEffect(() => {
    const loadProducts = async () => {
      if (role === 4) {
        // Pro zaměstnance načti produkty bez ohledu na sklad
        const employee_products = await fetchData('http://localhost:5000/products/by-storage');
        setProducts(employee_products);
      } else if (storageId) {
        // Načti produkty konkrétního skladu
        const storages_products = await fetchData(`http://localhost:5000/products/by-storage/${storageId}`);
        setProducts(storages_products);
      } else if (!storageId && all_products) {
        // Pokud není sklad vybrán, použij všechny produkty
        setProducts(all_products);
      }
    };

    loadProducts();
  }, [role, storageId, all_products]);


 const hadnleFilteredData =(data)=>{
   setFiltredProducts(data);
 }

  const handleSelectId = (selectedId) => {
    setStorageId(selectedId);
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

  const HeaderTitles = [
    {name:'Název'},
    {name:'Kategorie'},
    {name:'Počet'},
    {name:'Kód'},
    {name:'Pohyb'},
    {name:'Akce'},
  ]
  

  if (loadingProducts) return <p>Načítání produktů...</p>;
  if (errorProducts) return <p>Chyba při načítání produktů: {errorProducts.message}</p>;

  return (
    <div className="page">
      <div className='page-header flex'>
        <h2>Produkty</h2>
        {role === 3 && (<Button label={'Přidat produkt'} style={'button addButton'} onClick={() => goTo('/fullapp/add-product')} />)}
      </div>

      
      <Header data={products} getFiltred={hadnleFilteredData} label={'Vyhledat produkt'} selectData={storages} getSelectId={handleSelectId}/>
      <List data={filtredProducts} type={'products'} titles={HeaderTitles} deleteFunction={handleDelete} storageId={storageId}/>
    </div>
  );
};

export default ProductPage;
