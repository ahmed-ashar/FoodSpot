import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

app.get('/', (req, res) => {
  res.send('FoodSpot API Working');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});