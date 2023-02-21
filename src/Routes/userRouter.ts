import express from 'express'
import { UserController } from '../Controller/UserController'

export const userRouter = express.Router()
const userController = new UserController()

userRouter.get('/all', userController.getAllUsers)
userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.patch('/update/:id', userController.update)
userRouter.delete('/delete/:id', userController.remove)

