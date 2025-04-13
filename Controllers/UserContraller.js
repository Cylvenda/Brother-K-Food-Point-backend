import userModel from "../Models/UserModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator'

//login function
const logInUser = async (req, res, data) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({ success: false, message: "Invalid Credential" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log({error});
        res.json({success:false, message: "Error", data});
    }
}

const createToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET);
}


//register function
const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // checking for user
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User with the Email Provided Already Exist" })
        }
        //email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter A valid Email" })
        }

        // password
        if (password.length < 5) {
            return res.json({ success: false, message: "Your Password is too short" })

        }

        // harshing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { logInUser, registerUser } 