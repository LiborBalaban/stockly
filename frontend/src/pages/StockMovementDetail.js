import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StockProduct from "../components/StockProduct";
import { fetchData } from "../hooks/fetchFunction";
import Button from "../components/button";
import List from "../components/List";
import InfoHeader from "../components/InfoHeader";
import useData from "../hooks/loadData";


const StockMovementDetail = () => {
  const { id } = useParams();
  const [movement, setMovement] = useState([]);
  const [products, setProducts] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
   const { data:positions } = useData('http://localhost:5000/positions'); 

  const HeaderTitles = [
        {name:'Název'},
        {name:'Kód'},
        {name:'Množství: ks'},
        {name:'Cena: Kč'},
        {name:'Umístění'},
      ]

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const info = await fetchData(`http://localhost:5000/movements/move/${id}`);
        setMovement(info);

        const products = await fetchData(`http://localhost:5000/movements/items/${id}`);
        setProducts(products);

        
      } catch (err) {
        console.error("Chyba při načítání detailu naskladnění:", err);
      }
    };

    fetchDetail();
  }, [id]);

  const title = `Detail ${movement.typeId === 2 ? "Vyskladnění" : "Naskladnění"} #${movement.id}`

   const handleExport = async () => {
  try {
    setIsExporting(true);
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/movements/export/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Chyba při stahování souboru');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pohyb-${id}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Export se nezdařil', error);
  } finally {
    setIsExporting(false);
  }
};

  if (!movement) return <p>Načítání detailu...</p>;

 return (
    <div className="page">
    <div className="page-container">
      <InfoHeader title={title}/>

      <div className="info-block">
        <p><strong>Typ:</strong> {movement.typeId === 2 ? "Vyskladnění" : "Naskladnění"}</p>
        <p><strong>Datum:</strong> {new Date(movement.date).toLocaleString("cs-CZ")}</p>
        <p><strong>Vytvořil:</strong> {movement.user?.name}</p>
        
        {movement.description && <p><strong>Poznámka:</strong> {movement.description}</p>}
      </div>

       <h2>Vybrané produkty: {products.length}</h2>
      <List type={'stockDetail'} data={products} titles={HeaderTitles} positions={positions}/>
      <Button style={'button addButton'} label={isExporting ? 'Exportuji...' : 'Export do Excelu'} onClick={handleExport}/>
    </div>
    </div>
  );
};

export default StockMovementDetail;