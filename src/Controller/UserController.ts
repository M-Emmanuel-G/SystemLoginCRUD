import { NewRemoveDTO } from './../Model/Users';
import { UserBusiness } from "../Business/UserBusiness";
import {Request, Response} from 'express'
import { NewEditDTO, UserDTO} from "../Model/Users";

export class UserController{
    userBusiness = new UserBusiness()
    getAllUsers = async (req:Request, res:Response)=>{
        try {
            const result = await this.userBusiness.getAllUsers()
            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    signup = async(req:Request, res:Response)=>{
        try {
            const {name, email, password} = req.body
            const user:UserDTO = {
                name, 
                email,
                password
            }
            await this.userBusiness.signup(user)
            res.status(200).send({message:'User account has been created successfully'})
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    update = async (req:Request, res:Response)=>{
        try {
            const id = req.params.id
            const {password} = req.body

            const newEdit:NewEditDTO = {
                id,
                password
            }

            await this.userBusiness.update(newEdit)

            res.status(200).send('Your password has been updated successfully')

        } catch (error:any) {
            res.status(200).send(error.message || error.mysql)
        }
    } 

    remove = async(req:Request, res:Response)=>{
        try {
            const {id} = req.params

            const removeUser:NewRemoveDTO = {
                id
            }
            await this.userBusiness.remove(removeUser)

            res.status(200).send('The user has been removed successfully')
        } catch (error:any) {
            res.status(200).send(error.message || error.mysql)
        }
    }
}