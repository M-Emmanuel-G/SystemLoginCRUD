export interface UserDTO{
    name: string;
    email: string;
    password: string;
}

export interface NewUserDTO{
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface NewEditDTO{
    id: string;
    password: string
}

export interface NewRemoveDTO{
    id: string;
}

export interface LoginDTO{
    email:string;
    password:string;
}