import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockProduct from "../components/StockProduct";
import { fetchData } from "../hooks/fetchFunction";
import Button from "../components/button";
import List from "../components/List";
import InfoHeader from "../components/InfoHeader";
import { updateData } from "../hooks/updatetoDb";
import { useUser } from '../context/UserContext';

const InventoryPage = () => {
  const { id } = useParams();
  const [movement, setMovement] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
   const { role } = useUser();

  const HeaderTitles = [
        {name:'Název'},
        {name:'Kód'},
        {name:'Reálné množství'},
        {name:'Očekávané množství'},
        {name:'Rozdíl'},
      ]

      const title = movement && movement.name ? `Inventura ${movement.name}` : "Inventura";


        const fetchDetail = async () => {
      try {
        const info = await fetchData(`http://localhost:5000/inventory/${id}`);
        setMovement(info);

        const unchecked_products = await fetchData(`http://localhost:5000/inventory/items/${id}/unchecked`);
        setProducts(unchecked_products);

        const checked_products = await fetchData(`http://localhost:5000/inventory/items/${id}/checked`);
        setCheckedProducts(checked_products);
      } catch (err) {
        console.error("Chyba při načítání detailu naskladnění:", err);
      }
    };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const updateQunatity = (id, value) => {
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product.id === id ? { ...product, realQuantity: value } : product
          )
      );
  };

  const handleUpdateInventoryItem = async(id) => {
      if(id){
        const selectedProduct = products.find(product => product.id === id);
        const payload = {
          inventoryId:selectedProduct.inventoryId,
          productId:selectedProduct.product.id,
          realQuantity:selectedProduct.realQuantity,
          expectedQty:selectedProduct.expectedQty
        }
        console.log(payload);
        const resultMessage = await updateData(`http://localhost:5000/inventory/item/${id}`, payload);
        console.log(resultMessage.message);
        fetchDetail();
      } 
    };

  if (!movement) return <p>Načítání detailu...</p>;

 return (
    <div className="page">
    <div className="page-container">
      <InfoHeader title={title}/>

      <h2>Nezkonrolované produkty: {products.length}</h2>
      <List type={'inventory'} data={products} titles={HeaderTitles} handleQuantity={updateQunatity} onClick={handleUpdateInventoryItem}/>

      <h2>Zkontrolované produkty: {checkedProducts.length}</h2>
      <List type={'inventory'} data={checkedProducts} titles={HeaderTitles} handleQuantity={updateQunatity} onClick={handleUpdateInventoryItem}/>
      {role === 3 && <Button style={'button addButton'} label={'Ukončit inventuru'}/>}
    </div>
    </div>
  );
};

export default InventoryPage;