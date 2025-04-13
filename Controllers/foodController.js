import foodModel from "../Models/FoodModels.js";
import fs from 'fs'

// add food to the database
const addFood = async (req, res) => {
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({success: true, message: "Food Added successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error Product not Added"})
    }
}

//food list
const foodList = async (req, res) => {

    try {
        const foods = await foodModel.find({});
        res.json({success: true, data:foods})
    } catch (error) {
        res.json({success:false, message: "Server error"})
    }

}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`images/${food.Image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Deleted"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}


export {addFood, foodList, removeFood}