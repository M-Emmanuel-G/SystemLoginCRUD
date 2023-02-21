import { CustomError } from "./CustomError";

export class BodyNotInserted extends CustomError{
    constructor(){
        super(422, 'Todas as informações devem ser inseridas.')
    }
}

export class PasswordInvalid extends CustomError{
    constructor(){
        super(422, 'A senha precisa conter no minimo 6 caractéres.')
    }
}

export class EmailInvalid extends CustomError{
    constructor(){
        super(422, 'Formato inválido do email.')
    }
}

export class PasswordWrong extends CustomError{
    constructor(){
        super(404, 'Senha incorreta.')
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(422, 'Usuario não encontrado..')
    }
}

export class NotAuthorized extends CustomError{
    constructor(){
        super(404, 'Usuário não autorizado.')
    }
}

export class TokenNotInserted extends CustomError{
    constructor(){
        super(422, 'Token nao foi inserido.')
    }
}

export class IdNotInserted extends CustomError{
    constructor(){
        super(422, 'O id não foi inserido.')
    }
}

export class PasswordNotInserted extends CustomError{
    constructor(){
        super(422, 'Senha não foi inserida.')
    }
}