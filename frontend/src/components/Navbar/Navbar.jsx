import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCart, BiUser } from "react-icons/bi";
import "./Navbar.css";
import { FoodContext } from "../../context/FoodContext";
import { FaCentos } from "react-icons/fa";

const Navbar = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleNavigation = (path)=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        },2000)
            navigate(path);
    }

    const {getCartCount} = useContext(FoodContext);

  return (
    <div>
      {
        loading && (
          <div className="loader-container">
            <div className="loader">
              <FaCentos className="loader-icon" />
            </div>
          </div>
        )
      }
      <nav className="navbar">
        <div>
          <Link to="/">
            <h2>FoodSpot</h2>
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search for products...."
          />
          <button className="search-btn">SEARCH</button>
        </div>

        <div className="icons">
          <div className="profile-group">
            <BiUser className="icon" />
            <div className="dropdown-menu">
              <Link to="/login">
                <p className="dropdown-item">Login/Sign Up</p>
              </Link>
              <Link to="/orders">
                <p className="dropdown-item">Orders</p>
              </Link>
              <p className="dropdown-item">Logout</p>
            </div>
          </div>
          <button className="cart-icon" onClick={() => handleNavigation('/cart')}>
            <BiCart className="icon" />
            <span className="cart-qty">{getCartCount()}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
