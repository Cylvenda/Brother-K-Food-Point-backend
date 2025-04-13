import  express from 'express'
import { logInUser, registerUser } from '../Controllers/UserContraller.js'


const UserRouter = express.Router();

UserRouter.post('/register', registerUser)

UserRouter.post('/login', logInUser)

export default UserRouter