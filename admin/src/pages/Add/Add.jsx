import { useState } from "react";
import upload_image from "../../assets/generated-image.png";
import "./Add.css";
import { backendUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("All");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("success", response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        toast.error("fail", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="form-container">
      <div>
        <p className="form-label">Upload Image</p>
        <div className="image-upload-container">
          <label htmlFor="image">
            <img
              src={!image ? upload_image : URL.createObjectURL(image)}
              className="img-preview"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="image"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="form-group">
        <p className="form-label">Product Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="form-input"
          placeholder="Enter Product Name"
          required
        />
      </div>
      <div className="form-group">
        <p className="form-label">Product Description</p>
        <textarea
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Type Product Description"
          type="text"
          required
        />
      </div>
      <div className="form-group-horizontal">
        <div>
          <p className="form-label">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="form-select"
          >
            <option value="All">All</option>
            <option value="Spaghetti">Spaghetti</option>
            <option value="Pizza">Pizza</option>
            <option value="Rice">Rice</option>
            <option value="Chicken">Chicken</option>
            <option value="Noodles">Noodles</option>
            <option value="Drinks">Drinks</option>
          </select>
        </div>

        <div>
          <p className="form-label">Product Price</p>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="form-input price-input"
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
