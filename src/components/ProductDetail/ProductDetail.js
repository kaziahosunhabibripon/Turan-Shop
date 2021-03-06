import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Header/Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(()=>{
        fetch('https://whispering-mountain-22524.herokuapp.com/product/'+ productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data));
    },[productKey])           


    
    document.title = "Product Detail";
    return (
        <div>
            <h1> You are showing { productKey }  </h1>
            <Product showAddToCart ={false}product={product}></Product>
        </div>
    );
};

export default ProductDetail;