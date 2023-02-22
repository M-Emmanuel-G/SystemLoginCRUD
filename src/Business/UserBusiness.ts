import { TokenNotInserted } from './../Error/Errors';
import { LoginDTO, NewEditDTO, NewRemoveDTO, NewUserDTO, UserDTO } from './../Model/Users';
import { UserDatabase } from "../BaseDatabase/UsersDatabase"
import { IdGenerator } from "../Services/idGenerator"
import { Authenticator } from '../Services/authenticatos';
import { BodyNotInserted, EmailInvalid, NotAuthorized, PasswordInvalid, PasswordNotInserted, PasswordWrong, UserNotFound } from '../Error/Errors';

export class UserBusiness{
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()

    getAllUsers = async (token:string)=>{
        try {

            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new NotAuthorized();
            

            const result = this.userDatabase.getAllUsers() 
            return result   
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    signup = async(user:UserDTO)=>{
        try {
            const {name, email, password} = user
            if(!name || !email|| !password) throw new BodyNotInserted()
            if(!email.includes('@')) throw new EmailInvalid()
            if(password.length < 6) throw new PasswordInvalid()

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
            if(!email || !password) throw new BodyNotInserted()
            if(!email.includes('@')) throw new EmailInvalid()
            if(email.length < 6) throw new PasswordInvalid()

            const verifyEmail = await this.userDatabase.verifyEmail(email)
            if(verifyEmail.length !== 1) throw new UserNotFound()
            if(verifyEmail[0].password !== password) throw new PasswordWrong()

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
            if(!verifyToken) throw new NotAuthorized()
            
            if(!password) throw new PasswordNotInserted()
            if(password.length < 6) throw new PasswordInvalid()
            

            const edit:NewEditDTO = {
                id, 
                password
            }

            const userExist = await this.userDatabase.verifyUserByID(id)
            if(userExist.length !== 1) throw new UserNotFound();
            

            await this.userDatabase.update(edit)
            

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    remove = async(removeUser:NewRemoveDTO, token:string)=>{
        try {
            const {id} = removeUser

            const userExist = await this.userDatabase.verifyUserByID(id)
            if(userExist.length !== 1) throw new UserNotFound()

            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new NotAuthorized()

            const newRemoveUser:NewRemoveDTO = {
                id
            }


            await this.userDatabase.remove(newRemoveUser)
            
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    getProfile = async (inToken:string)=>{
        try {
            if(!inToken) throw new TokenNotInserted()
            
            const token = this.authenticator.getTokenData(inToken)
            if(!token) throw new NotAuthorized()

            const result = await this.userDatabase.getProfile(token)
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

}