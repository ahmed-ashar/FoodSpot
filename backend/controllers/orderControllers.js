import orderModel from "../models/orderModels.js";
import productModel from "../models/productModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "usd";
const deliveryCharge = 12;

const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        const product = await productModel.findById(itemId);

        if (!product) {
          throw new Error("No product found");
        }

        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );

    if (items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      status: "Pending",
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order could not be placed" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const { origin } = req.headers;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        const product = await productModel.findById(itemId);

        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );

    if (items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
      status: "Pending",
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = [];

    // Add product line items
    items.forEach((item) => {
      line_items.push({
        price_data: {
          currency: currency,
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      });
    });

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
  }
};

const verifyStripe = async (req,res)=>{
  const {orderId,success,userId} = req.body

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true})

      await userModel.findByIdAndDelete(userId,{cartData:{}})

      res.json({success:true})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

const allOrder = async (req, res) => {
  try {
    const order = await orderModel.find({});
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not fetch order" });
  }
};

const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not fetch order" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {verifyStripe, allOrder, placeOrder, placeOrderStripe, updateStatus, userOrder };
