import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [oderPlaced, setOderPlaced ]=useState(false);
    const history = useHistory();
    const handleProceedCheckout = ()=>{
       history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        // cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct);
    }, [])
    let thankyou;
    if(oderPlaced){
       thankyou = <img src={happyImage} alt="happy"></img>
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                <h1> Cart Items:{cart.length} </h1>
                {
                    cart.map(pd => <ReviewItems
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd} ></ReviewItems>)
                }
                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="add-btn"> Proceed Checkout </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;