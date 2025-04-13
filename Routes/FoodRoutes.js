import express from 'express'
import { addFood, foodList, removeFood } from '../Controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

// image storage Engine
const storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) =>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/foodAdd", upload.single("image"),addFood)
foodRouter.get("/foodList", foodList)
foodRouter.post("/foodRemove", removeFood)

export default foodRouter