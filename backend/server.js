import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use('/api/product', productRouter);
app.use('/api/cart' , cartRoute)
app.use('/api/order' , orderRoute)

app.get('/', (req, res) => {
  res.send('FoodSpot API Working');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});