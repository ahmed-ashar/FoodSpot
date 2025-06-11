import { createContext, useState, useEffect } from "react";
import { product } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios";

export const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {
  const delivery_fee = 12;
  const currency = "$";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
    setCartItems(updatedCart);

    toast.success("Added to cart");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
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

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
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
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    getProductsData();
  }, []);

  // Sync token from localStorage on mount, and update localStorage when token changes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(token);
    }
    if (!token) {
      localStorage.removeItem("token");
      setCartItems({});
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <FoodContext.Provider
      value={{
        products,
        getCartAmount,
        addToCart,
        getCartCount,
        getUserCart,
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