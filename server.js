import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { DBconnection } from './Config/db.js';
import foodRouter from './Routes/FoodRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import 'dotenv/config'
import cartRouter from './Routes/CartRoutes.js';

// App config
const PORT = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// db connection (mongodb)
DBconnection();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('images'));
app.use('/api/user', UserRoutes)
app.use('/api/cart', cartRouter)


app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});

