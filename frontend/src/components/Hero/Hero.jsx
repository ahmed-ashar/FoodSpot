import React from "react";
import hero_img from "../../assets/pasta2.png";
import "./Hero.css";
import { FaShippingFast } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero_top">
          <div className="hero_left">
            <h2>Enjoy Your Delicious Meal</h2>
            <h1>Discover Delicious Healthy Meal That Nourishes You</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              sapiente modi obcaecati omnis molestias, cum veritatis eaque harum
              ullam, dicta tenetur id voluptatibus consequuntur quasi est
              officiis labore nobis. Maxime.
            </p>
            <button className="explore">Explore Our Menu</button>
          </div>
          <div className="hero_right">
            <img src={hero_img} alt="Delicious Meal" className="hero_img" />
          </div>
        </div>
        <div className="hero_bottom">
          <div className="hero_content">
            <div className="info_icon">
              <FaShippingFast className="hero_icon" />
            </div>
            <div className="detail">
              <h3>Free Shipping</h3>
              <p>Free shipping on order</p>
            </div>
          </div>
          <div className="hero_content">
            <div className="info_icon">
              <FiSend className="hero_icon" />
            </div>
            <div className="detail">
              <h3>Worldwide Delivery</h3>
              <p>We deliver to all countries</p>
            </div>
          </div>
          <div className="hero_content">
            <div className="info_icon">
              <BiSupport className="hero_icon" />
            </div>
            <div className="detail">
              <h3>24/7 Support</h3>
              <p>Full support on process</p>
            </div>
          </div>
          <div className="hero_content">
            <div className="info_icon">
              <MdPayment className="hero_icon" />
            </div>
            <div className="detail">
              <h3>Secure Payment</h3>
              <p>Your payment is secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
