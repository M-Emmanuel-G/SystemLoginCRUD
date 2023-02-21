import {v4} from 'uuid'

export abstract class IdGenerator{
    static GenerateId = () =>{
        return v4()
    }
}