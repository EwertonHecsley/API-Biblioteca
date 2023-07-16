# API para Sistema de Bibliotecas em Node.js

## Introdução
Este projeto é uma API para um sistema de bibliotecas implementado em Node.js usando o framework Express. A API se conecta a um banco de dados PostgreSQL chamado "biblioteca".

## Tabelas
A API possui duas tabelas:

- **autores**: Esta tabela contém informações sobre os autores.
- **livros**: Esta tabela contém informações sobre os livros.

## Endpoints
A API possui os seguintes endpoints:

- **/autor**: Este endpoint retorna uma lista de todos os autores.
- **/autor/:id**: Este endpoint retorna informações sobre um autor específico.
- **/livro**: Este endpoint retorna uma lista de todos os livros.
- **/livro/:id**: Este endpoint retorna informações sobre um livro específico.

## Validações
A API realiza as seguintes validações:

- Os campos obrigatórios não podem estar vazios.
- Os valores dos campos devem estar dentro dos limites especificados.

## Conexões
A API se conecta ao banco de dados PostgreSQL usando o módulo pg. O módulo pg fornece uma interface ao PostgreSQL que é fácil de usar e eficiente.
