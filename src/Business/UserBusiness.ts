import { NewEditDTO, NewRemoveDTO, NewUserDTO, UserDTO } from './../Model/Users';
import { UserDatabase } from "../BaseDatabase/UsersDatabase"
import { IdGenerator } from "../Services/idGenerator"

export class UserBusiness{
    userDatabase = new UserDatabase()
    getAllUsers = async ()=>{
        try {
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

            const id = IdGenerator.GenerateId()

            const newUser:NewUserDTO = {
                id, 
                name,
                email,
                password

            }
            await this.userDatabase.SignUp(newUser)

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    update = async(newEdit:NewEditDTO)=>{
        try {
            const {id, password} = newEdit

            // if(!password) throw new Error('PasswordNotInserted')
            // if(password.length < 6) throw new Error('Password must be at least 6 characters')

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

    remove = async(removeUser:NewRemoveDTO)=>{
        try {
            const {id} = removeUser
            if(!id) throw new Error('IdNotInserted')

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