const express = require('express');
const { cadastrar, listarAutores, buscarAutorId, cadastrarLivro, listarLivros } = require('../controllers/controlador');
const { verificaCampoNome } = require('../middlewares/middleware');
const rota = express.Router();

//-----------Rotas destinadas para manipulaçao de autores----------//

rota.post('/autor', verificaCampoNome, cadastrar); //Cadastrar um autor
rota.get('/autor', listarAutores); //Listar todos os autores
rota.get('/autor/:id', buscarAutorId); //Buscar autor por ID

//-----------Rotas destinadas para manipulação de livros-----------//

rota.post('/autor/:id/livro', verificaCampoNome, cadastrarLivro); //Cadastrar um livro
rota.get('/livro', listarLivros); //Listar tos os livros



module.exports = rota;