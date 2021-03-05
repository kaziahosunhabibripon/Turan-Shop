import React from 'react';

const ReviewItems = (props) => {
    const { name, quantity, key, price } = props.product;
    const ReviewItemsStyle ={
        borderBottom:'1px solid  lightgrey',
        marginBottom: '5px',
        paddingBottom:"5px",
        marginLeft:"200px"
    }
    return (
        <div style={ReviewItemsStyle}>
            <h4 className="review-item"> {name} </h4>
            <p>Quantity {quantity} </p>
            <p> <small> ${price} </small> </p>
            <button
             className="add-btn"
             onClick={()=> props.removeProduct(key)}
             > 
                Remove 
             </button>
        </div>
    );
};

export default ReviewItems;