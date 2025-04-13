import mongoose from "mongoose";

export const DBconnection = async () => {
    await mongoose.connect('mongodb://localhost:27017/food-point')
    .then(()=> console.log('Database connected successfuly'));
}

