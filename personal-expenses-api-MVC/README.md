Descrição do projeto

Esta API tem como objetivo gerenciar despesas pessoais, permitindo que o usuário registre, visualize, atualize e exclua suas despesas de forma simples.

Objetivo da API

A API foi desenvolvida para:

Registrar despesas do dia a dia;
Listar todas as despesas cadastradas;
Buscar uma despesa específica por ID;
Atualizar informações de uma despesa;
Remover despesas do sistema;

Não utiliza banco de dados — os dados são armazenados em um arquivo JSON local.

Tecnologias utilizadas:

Node.js → ambiente de execução JavaScript;
Express → framework para criação da API;
File System (fs) → manipulação de arquivos JSON;
Path → gerenciamento de caminhos de arquivos;

Como executar o projeto

Instalar dependências
npm install

Iniciar o servidor
npm start

Servidor

A API estará disponível em: http://localhost:3000

Rotas da API

Método	    Rota	            Descrição
GET	     expenses	      Lista todas as despesas
GET	     expenses/:id	  Busca uma despesa por ID
POST	 expenses	      Cria uma nova despesa
PUT	     expenses/:id	  Atualiza uma despesa
DELETE	 expenses/:id	  Remove uma despesa

Modelo de dados

Entidade: Expense

Representa uma despesa cadastrada no sistema.

{
    "id": "exp_1774395021910",
    "title": "Gasolina",
    "amount": 120,
    "category": "Transporte",
    "date": "2026-03-15",
    "description": "Abastecimento do carro",
    "createdAt": "2026-03-24T23:30:21.910Z"
}

Campos

  Campo     	 Tipo	   Obrigatório	Descrição
id	           string	       Sim	      Identificador único da despesa (gerado automaticamente)
title	       string	       Sim	      Nome/título da despesa
amount	       number	       Sim	      Valor da despesa (deve ser maior que 0)
category	   string	       Não	      Categoria da despesa (padrão: "Outros")
date	       string	       Sim	      Data da despesa (não pode ser futura)
description	   string	       Não	      Descrição adicional
createdAt	   string (ISO)	   Não	      Data de criação do registro (gerado automaticamente)