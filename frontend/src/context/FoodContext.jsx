import { createContext, use, useState } from "react";
import { product } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios";
import { useEffect } from "react";

export const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {
  //   const foodData = product;

  const delivery_fee = 12;
  const currency = "$";

  const [products, setProducts] = useState(product);
  const [cartItems, setCartItems] = useState({});
  let [token, setToken] = useState("");

  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    setCartItems(updatedCart);

    console.log(`${itemId} added to cart`);

    toast.success("Added to cart");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0
    );
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [itemId, quantity]) => {
        const itemInfo = products.find((product) => product._id === itemId);
        return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
      },
      0
    );
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  

  useEffect(() => {
    getProductsData();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <FoodContext.Provider
      value={{
        products,
        getCartAmount,
        addToCart,
        getCartCount,
        delivery_fee,
        updateQuantity,
        currency,
        navigate,
        cartItems,
        token,
        setToken,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;
