# SystemLoginCRUD

## Sobre o sistema:

  Este é um sistema simples onde o usuário possa criar uma conta, realizar login, e vizualizar todos os usuarios após o login.
  O usuário que estiver logado será fornecido um token, onde será possivel editar senha de sua conta e exclui-la.

Link da API: https://login-crud.onrender.com

## Tecnologias utilizadas e conceitos:

* NodeJs
* Knex
* Mysql
* TypeScript
* Express
* UUID
* Dotenv
* Autenticação e autorização
* Router
* JWT

## Rodando localmente:

* Faça o **CLONE** do repositório 
* Criando tabelas no mysql ( Users: id, name, email, password )
* Execute o comando **NPM INSTALL**
* Configurar/criar o dotenv para conexão com o banco de dados e criar chave do JWT

## Endpoints:

### Criar usuário:
  
 POST https://login-crud.onrender.com/users/signup 

  {
  
    "name":"",
    "email":"",
    "password":""
    
  }

### Login 

  POST https://login-crud.onrender.com/users/login 
  
   {
   
       "email":"",
       "password":""
       
   }
 
 ### Todos os Usuários
 
  GET https://login-crud.onrender.com/users/all 
  
 authorization: ""
 
 ### Editar senha usuário
 
 PATCH https://login-crud.onrender.com/users/update/:id 
 
 authorization: ""
 
   {
    
     "password":""
    
   }
 
 ### Deletar usuário
 
  DEL https://login-crud.onrender.com/users/delete/:id
 
 authorization: ""
 
 ### Obter Profile
 
  GET https://login-crud.onrender.com/users/profile
 
 authorization: ""
 
