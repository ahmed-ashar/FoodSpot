import React, { useContext, useState } from 'react'
import { FoodContext } from '../../context/FoodContext';
import { useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import CartTotal from '../../components/CartTotal/CartTotal';

const Cart = () => {

  const {products, getCartAmount, getCartCount, cartItems, delivery_fee, currency, updateQuantity, navigate} = useContext(FoodContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length === 0) return;

    if(!cartItems || typeof cartItems !== "object"){
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems).filter(([, quantity]) => quantity > 0).map(([itemId, quantity]) => ({
      _id: itemId,
      quantity
    }))

    setCartData(tempData);
      
  },[cartItems, products]);

  return (
    <div>
      <div>
        <h2>Cart Items</h2>
      </div>
      <div className='cart-content-container'>
        {
          cartData.map((item,index)=>{
            const productData = products.find(product => product._id === item._id);
            if(!productData) return null;
            return(
              <div className="cart-item" key={index}>
                <div>
                  <img src={productData.image} alt="" className="product-cart-image" />
                  <div className="produtc-details-cart">
                    <p className="cart-product-name">{productData.name}</p>
                    <p className="cart-product-price">{currency}{productData.price}</p>
                  </div>
                </div>
                <input type="number" min={1} defaultValue={item.quantity} className='quantity-input' onChange={(e)=>e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item.id, Number(e.target.value))} />
                <MdDelete className='delete-icon' onClick={()=>{
                  // const updatedCart = { ...cartItems };
                  // delete updatedCart[item._id];
                  updateQuantity(item._id, 0);
                  // setCartData(prevData => prevData.filter(cartItem => cartItem._id !== item._id));
                }} />
              </div>
            )
          })
        }
      </div>
      <div className='checkout-container'>
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-btn-container"></div>
          <button onClick={()=>navigate("/checkout")}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart