import productModel from "../models/productModels.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    console.log("first", req.file, req.file.path);

    let imageUrl = "";
    if (req.file && req.file.path) {
      console.log("under if", req.file, req.file.path);
      imageUrl = req.file.path; // Cloudinary URL from multer-storage-cloudinary
    }

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      image: imageUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({success:true, products });
    // res.json({ message: "Here is the list of the products" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

import cloudinary from "../config/cloudinary.js";

const removeProduct = async (req, res) => {
  try {
    console.log("ID to delete:", req.body._id);

    const product = await productModel.findById(req.body._id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.image) {
      const urlParts = await product.image.split("/");
      const folderAndFile = await urlParts.slice(-2).join("/");
      const publicId = await folderAndFile.substring(0, folderAndFile.lastIndexOf("."));

      await cloudinary.uploader.destroy(publicId);
    }

    await productModel.findByIdAndDelete(req.body._id);

    res.status(200).json({ success: true, message: "Product and image removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body;

    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
