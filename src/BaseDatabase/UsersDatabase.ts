import { AuthenticationData } from "../Model/Authenticator";
import { NewEditDTO, NewRemoveDTO, NewUserDTO } from "../Model/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    TABLE_NAME = 'Users'

    getAllUsers = async ()=>{
        try {
            const result = await UserDatabase.connection(this.TABLE_NAME)
                .select()
           
            return result
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    SignUp = async (newUser:NewUserDTO)=>{
        try {
        await UserDatabase.connection()
                .insert(newUser)
                .into(this.TABLE_NAME)

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    update = async (newEdit:NewEditDTO) =>{
        try {
            const {id, password} = newEdit
            await UserDatabase.connection 
                .update({ password: password})
                .where({ id:id})
                .from(this.TABLE_NAME)
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    remove = async(id:NewRemoveDTO)=>{
        try {
            await UserDatabase.connection
                .delete()
                .where(id)
                .from(this.TABLE_NAME)
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    verifyUserByID = async (id:string)=>{
        try {
            const result = await UserDatabase.connection
                .select()
                .where({id})
                .from(this.TABLE_NAME)

            return result  

        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    verifyEmail = async(email:string)=>{
        try {
        const result = await UserDatabase.connection
            .select()
            .where({email})
            .from(this.TABLE_NAME)
        return result    
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    getProfile = async (token:AuthenticationData)=>{
        try {
            const result = await UserDatabase.connection
                .select()
                .from(this.TABLE_NAME)
                .where({id:token.id})
            return result[0]
            } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

}