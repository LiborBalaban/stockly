import '../App.css';
import Product from './Product';
import Item from './item';
import Input from './inputs/input';
import StockInfo from './StockInfo';
import StockProduct from './StockProduct';
import { useEffect, useState } from 'react';
import InventoryProduct from './InventoryProduct';

const List = ({type, data, titles, deleteFunction, handlePice, handleQuantity, updatePosition, positions, storageId, deleteProduct, onClick}) => {
  
  if (titles.length <= 3) {
    const spans = document.querySelectorAll('.ProductPageNavTitles span');
    if (spans.length > 0) {
      spans[0].style.textAlign = 'start'; // Styl pro první span
  }

  if (spans.length > 1) {
      spans[spans.length - 1].style.textAlign = 'end';
      spans[spans.length - 1].style.paddingRight = '120px'; // Styl pro poslední span
  }

  if (spans.length === 2) {
    spans[0].style.textAlign = 'start'; // Zarovnání prvního
    spans[1].style.textAlign = 'end';   // Zarovnání posledního
    spans[1].style.paddingRight = '120px'; // Odsazení posledního
}
}
  return (
   <div className='list flex'>

    <div className='flex ProductPageNavTitles'>
          <div className='flex' >
          <div className='checkbox-input'>
          <Input type={'checkbox'}/>
          </div>
          </div>
          {titles.map(title => (
            <span>{title.name}</span>
          ))}
        </div>

        {data.map((item) => (
        <div key={item.id} className="table-row">
          {type === "products" && <Product 
          quantity={(item?.totalQuantity || item?.stocks?.[0]?.quantity || 0) + ' ks'}
            name={item.name} 
            category={item.category ? item.category.name : "Nedefinováno"} 
            code={item.code} 
            link={storageId !== '' ? `/fullapp/add-product/${item.id}/${storageId}` : `/fullapp/add-product/${item.id}`} 
            position= {item.StockTransaction?.[0]?.movement?.date
              ? new Date(item.StockTransaction?.[0]?.movement?.date).toLocaleString().slice(0,11) 
              : "Nedefinováno"}
            id={item.id} 
            image={`http://localhost:5000/${item.images[0]?.url.replace(/\\/g, '/')}` || ''}
            deleteFunction={()=>deleteFunction(`http://localhost:5000/delete-product/${item.id}`)}
          />}

          {type === "item" && <Item name={item.name} deleteFunction={()=>deleteFunction()}/>}
          
          {type === "category" && <Item name={item.name} link={`/admin/category/${item.id}`} deleteFunction={()=>deleteFunction(`http://localhost:5000/categories/${item.id}`)}/>}

           {type === "tasks" && <Item name={item.typeId === 2 ? `Vyskladnění: ${item.id}` : `Naskladění: ${item.id}`} link={`http://localhost:3000/fullapp/${item.typeId === 2 ? 'stockout' : 'stock'}/${item.id}`}/>}

          {type === "inventories" && <Item name={item.name} link={`/fullapp/inventory/${item.id}`} deleteFunction={()=>deleteFunction(`http://localhost:5000/inventory/${item.id}`)}/>}
          
          {type === "storage" && <Item name={item.name} info={item.city} link={`/admin/add-storage/${item.id}`} deleteFunction={()=>deleteFunction(`http://localhost:5000/delete-storage/${item.id}`)}/>}
          
          {type === "supplier" && <Item name={item.name} info={item.email} link={`/admin/add-supplier/${item.id}`} deleteFunction={()=>deleteFunction(`http://localhost:5000/delete-supplier/${item.id}`)}/>}
          
          {type === "employee" && <Item name={item.name} info={item.email} link={`/admin/add-employee/${item.id}`} deleteFunction={()=>deleteFunction(`http://localhost:5000/delete-employee/${item.id}`)}/>}
          
          {type === "moves" && <StockInfo user={item.user.name} count={item.stockTransaction.length || ''} supplier={item.supplier?.name || ''} type={item.typeId} storage={item.storage.name} date={item.date} link={`/fullapp/movement/${item.id}`}/>}
          
          {type === "moves_product" && (<StockInfo user={item.movement.user.name} count={item.quantity || ''} supplier={item.movement.supplier?.name || ''} type={item.movement.typeId} storage={item.movement.storage.name} date={item.movement.date} position={item.position?.name || 'Nedefinováno'}/>)}
          
          {type === "stock" && <StockProduct id={item.id} name={item.name} code={item.code} handlePice={handlePice} handleQuantity={handleQuantity} updatePosition={updatePosition} data={positions} price={item.price} quantity={item.quantity} onClick={()=>deleteProduct(item.id)}/> }

            {type === "stockDetail" && <StockProduct id={item.id} name={item.product.name} code={item.product.code} handlePice={handlePice} handleQuantity={handleQuantity} updatePosition={updatePosition} data={positions} price={item.price} quantity={item.quantity} position={item.positionId}/> }

               {type === "inventory" && <InventoryProduct id={item.id} name={item.product.name} code={item.product.code} handlePice={handlePice} handleQuantity={handleQuantity} updatePosition={updatePosition} data={positions} expected_quantity={item.expectedQty} real_quantity={item.realQuantity} onClick={()=>onClick(item.id)}/> }
        </div>
      ))}
   </div>
  );
}
export default List;