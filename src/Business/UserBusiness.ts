import { LoginDTO, NewEditDTO, NewRemoveDTO, NewUserDTO, UserDTO } from './../Model/Users';
import { UserDatabase } from "../BaseDatabase/UsersDatabase"
import { IdGenerator } from "../Services/idGenerator"
import { Authenticator } from '../Services/authenticatos';

export class UserBusiness{
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()

    getAllUsers = async (token:string)=>{
        try {

            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new Error('NotAuthorized');
            

            const result = this.userDatabase.getAllUsers() 
            return result   
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    signup = async(user:UserDTO)=>{
        try {
            const {name, email, password} = user
            if(!name || !email|| !password) throw new Error('BodyNotInserted')
            if(!email.includes('@')) throw new Error('FormatInvalidEmail')
            if(password.length < 6) throw new Error('Password must be at least 6 characters')

            const id: string = IdGenerator.GenerateId()

            const newUser:NewUserDTO = {
                id, 
                name,
                email,
                password

            }

            await this.userDatabase.SignUp(newUser)
            const token = this.authenticator.generateToken({id})
            return token

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    login = async(user:LoginDTO)=>{
        try {
            const {email, password} = user
            if(!email || !password) throw new Error('BodyNotInserted');
            if(!email.includes('@')) throw new Error('FormatInvalidEmail')
            if(email.length < 6) throw new Error('Password must be at least 6 characters')

            const verifyEmail = await this.userDatabase.verifyEmail(email)
            if(!verifyEmail) throw new Error('UserNotFound')
            if(verifyEmail[0].password !== password) throw new Error('Password Incorrect')

            const token = this.authenticator.generateToken({id:verifyEmail[0].id})
            return token

            

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    update = async(newEdit:NewEditDTO, token:string)=>{
        try {
            const {id, password} = newEdit
           
            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new Error('NotAuthorized')
            
            if(!password) throw new Error('PasswordNotInserted')
            if(password.length < 6) throw new Error('Password must be at least 6 characters')
            

            const edit:NewEditDTO = {
                id, 
                password
            }

            const userExist = await this.userDatabase.verifyUserByID(id)
            if(userExist.length !== 1) throw new Error('UserNotFound or IdNotInserted');
            

            await this.userDatabase.update(edit)
            

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    remove = async(removeUser:NewRemoveDTO, token:string)=>{
        try {
            const {id} = removeUser
            if(!id) throw new Error('IdNotInserted')

            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new Error('NotAuthorized')

            const newRemoveUser:NewRemoveDTO = {
                id
            }

            const userExist = await this.userDatabase.verifyUserByID(id)
            if(userExist.length !== 1) throw new Error('UserNotFound or IdNotInserted');

            await this.userDatabase.remove(newRemoveUser)
            
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

}