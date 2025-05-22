import '../App.css';
import React, { useState } from "react";
import Input from './inputs/input';
import Select from './inputs/select';
import check from '../Images/double-check.png'

const InventoryProduct = ({name, id, code, updatePosition, handleQuantity, data, handlePice, real_quantity, expected_quantity, onClick}) => {
  
  const difference = Number(real_quantity) - Number(expected_quantity);
  
  return (
       <div className="item">
         <div className='checkbox-input'>
        <Input type={'checkbox'}/>
        </div>
            <h2 className='stockName'>{name}</h2>
            <span className='stockInfo'>{code}</span>
            <div className='item_inputs'>
            <input type="text" placeholder='0' onChange={(e)=>handleQuantity(id , e.target.value)} value={real_quantity}/>
            <input type="text" placeholder='0' onChange={(e)=>handlePice(id, e.target.value)} value={expected_quantity}/> 
            <span className={difference < 0 ? 'negative' : 'positive'}>{difference}</span>
            </div>
            <img src={check} alt="" onClick={onClick}/>
        </div>  
  );
};

export default InventoryProduct;