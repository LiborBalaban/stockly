import '../App.css';
import React, { useState, useEffect } from "react";
import StockProduct from '../components/StockProduct';
import { useNavigate } from 'react-router-dom';
import AutoCompleteInput from '../components/inputs/AutoCompleteInput';
import useData from '../hooks/loadData';
import StockForm from '../components/forms/StockForm';
import { postData } from '../hooks/addToDb';
import Button from '../components/button';
import List from '../components/List';
import { fetchData } from '../hooks/fetchFunction';
import { useUser } from '../context/UserContext';
import AlertBox from '../components/AlertBox';
import File from '../components/inputs/file';
import {useParams } from 'react-router-dom';

const StockOutPage = () => {
    const [products, setProducts] = useState([]);
    const { data: all_products, loading, error } = useData('http://localhost:5000/products/by-company');
    const today = new Date();
    const { role } = useUser();
    const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
    const [positions, setPositions] = useState([]);
    const [storageId, setStorageId] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [file, setFile] = useState([]);
    const [info, setInfo] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const loadPositions = async () => {
          try {
            if (!storageId && role !== 4) return; // Kontrola, zda má smysl volat API
      
            if (role === 4) {
              const positions_employee = await fetchData(`http://localhost:5000/positions/by-storage`);
              setPositions(positions_employee);
            } else if(storageId){
              const positions_storage = await fetchData(`http://localhost:5000/positions/by-storage/${storageId}`);
              setPositions(positions_storage);
            }
          } catch (error) {
            console.error("Chyba při načítání pozic:", error);
          }
        };
      
        loadPositions();
      }, [storageId, role]);



      useEffect(() => {
    const loadData = async () => {
      if (!id || all_products.length === 0) return;
  
      try {
        const info = await fetchData(`http://localhost:5000/expected-delivery/${id}`);
        setInfo(info);

      const products = await fetchData(`http://localhost:5000/expected-delivery/products/${id}`);
      setProducts((prevProducts) => {
        const newProducts = products
          .filter((item) => !prevProducts.some((p) => p.id === item.productId))
          .map((item) => {
            const productDetails = all_products.find(p => p.id === item.productId);
             console.log('Hledám produkt:', item.productId);
            console.log('Našel jsem:', productDetails);
            return {
              id: item.productId,
              quantity: item.quantity,
              price: item.price,
              name: productDetails?.name || 'Neznámý produkt',
              code: productDetails?.code || '',
            };
          });

  return [...prevProducts, ...newProducts];
});

        
        } catch (error) {
        console.error("Chyba při načítání dat:", error);
        }
    };
  
    loadData();
  }, [id, all_products]);

    const HeaderTitles = [
        {name:'Název'},
        {name:'Kód'},
        {name:'Množství: ks'},
        {name:'Cena: Kč'},
        {name:'Umístění'},
      ]

      const handleVisibility =(visible)=>{
        setAlert(visible);
        //goTo('/admin/categories');
      }
    // Přidání nebo aktualizace produktu v seznamu
    const getId = (productId) => {
        setProducts((prevProducts) => {
            const exists = prevProducts.some((product) => product.id === productId);
            if (exists) {
                return prevProducts;
            } else {
                return [...prevProducts, { id: productId, quantity: 1, price: 0 }];
            }
        });
    };

    const updatePrice = (id, value) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, price: value } : product
            )
        );
    };

    const updateQunatity = (id, value) => {
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product.id === id ? { ...product, quantity: value } : product
          )
      );
  };

  const updatePosition = (id, value) => {
    setProducts((prevProducts) =>
        prevProducts.map((product) =>
            product.id === id ? { ...product, positionId: value} : product
        )
    );
};

    const selectedProducts = products.map((product) => {
    const productData = all_products.find((p) => p.id === product.id);
    return { ...productData, ...product }; // zachová quantity/price/positionId z tvého stavu
});

    const handleStorage =(id)=> {
        console.log("Ukládám ID do useState:", id); 
        setStorageId(id);
      };

    const handleStock = async(formData) => {
        console.log("Data přijatá z formuláře:", formData);
        const cleanedProducts = products.map(({ id, quantity, price, positionId }) => ({
        id,
        quantity,
        price,
        positionId
      }));
        const payload = {
            stockDetails: {
              supplierId:formData.supplierId,
              description:formData.description,
              invoiceNumber: formData.invoiceNumber,
              storageId: formData.storageId,
            },
            expectedDelivery:id,
            typeMovement : 2,
            products: cleanedProducts
        };
        console.log(payload);
        const result = await postData('http://localhost:5000/movements', payload);
        setAlert(true);
        setAlertMessage(result.message);
      };


       const handleExpectedDelivery = async(formData) => {
        console.log("Data přijatá z formuláře:", formData);
        const payload = {
            stockDetails: formData,
            typeMovement : 2,
            products: products
        };
        console.log(payload);
        const result = await postData('http://localhost:5000/expected-delivery', payload);
        setAlert(true);
        setAlertMessage(result.message);
      };


      const handleFileChange = async (files) => {
  const fileArray = Array.from(files);

  const excelFiles = fileArray.filter((file) =>
    file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
  );

  if (excelFiles.length === 0) {
    console.warn('❗ Žádný Excel soubor nebyl vybrán');
    return;
  }

  // Uložení do stavu
  setFile((prevData) => ({
    ...prevData,
    productExcelFiles: [...(prevData.productExcelFiles || []), ...excelFiles],
  }));

  console.log('📄 Excel soubory:', excelFiles);

  // Hned odešleme první soubor
  const formData = new FormData();
  formData.append('file', excelFiles[0]); // nebo loop přes všechny, ale obvykle se posílá jeden

  try {
    const response = await postData('http://localhost:5000/expected-delivery/upload', formData);

   if (!Array.isArray(response)) {
      throw new Error('Neočekávaný formát odpovědi ze serveru');
    }

    setProducts((prevProducts) => {
    const newProducts = response
    .filter((item) => !prevProducts.some((p) => p.id === item.productId))
    .map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

  return [...prevProducts, ...newProducts];
});

  } catch (error) {
    console.error('Chyba při odesílání:', error);
  }
};

const handleRemoveProduct = (id) => {
  setProducts((prev) => prev.filter((product) => product.id !== id));
};
    

    return (
        <div className="page">
            {alert && (<AlertBox message={alertMessage} onClick={handleVisibility}/>)}
            <div className='page-header'>
                <h2>Vyskladnění</h2>
                {role === 3 && <File onChange={handleFileChange} style={'custom-file-upload'}/>}
            </div>
            <div className='StockPageNav'>
                <div className='flex stockHeader'>
                    <span>{"Dnešní datum: " + formattedDate}</span>
                    <span>Vyskladnění</span>
                </div>
            </div>
            <div className='flex StorckProductsEdit'>
                <div className='StockProducts flex'>
                    <div className='flex buttonFlex' >
                    <AutoCompleteInput data={all_products} onClick={getId} />
                    <Button label={'Požádat o přidání'} style={'button addButton'}/>
                    </div>
                    
                    <h2>Vybrané produkty: {products.length}</h2>
                    <List type={'stock'} data={selectedProducts} titles={HeaderTitles} handlePice={updatePrice} handleQuantity={updateQunatity} updatePosition={updatePosition} positions={positions} deleteProduct={handleRemoveProduct}/>
                </div>
                <StockForm onSubmit={handleStock} handleStorage={handleStorage} type={'stockout'} onSubmitExpectedDelivery={handleExpectedDelivery} data={info}/>
            </div>
        </div>
    );
};

export default StockOutPage;