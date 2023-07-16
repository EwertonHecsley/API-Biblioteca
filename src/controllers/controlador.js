const client = require('../conection');

const cadastrar = async (req, res) => {
    const { nome, idade } = req.body;

    try {
        await client.query(`
          INSERT INTO autores(nome, idade)
          VALUES
            ('${nome}','${idade}')
        `);
        const autorCadastrado = await client.query(`SELECT * FROM autores`);
        return res.status(201).json(autorCadastrado.rows[autorCadastrado.rows.length - 1]);

    } catch (error) {
        console.log(error.message);
    };
};

const listarAutores = async (_req, res) => {
    try {
        const listar = await client.query(`SELECT * FROM autores`);
        return res.status(200).json(listar.rows);
    } catch (error) {
        console.log(error.message)
    };
};

const buscarAutorId = async (req, res) => {
    const { id } = req.params;

    try {
        const autor = await client.query(`
        SELECT autores.id,autores.nome,autores.idade,livros
        FROM autores
        JOIN livros ON autores.id = livros.autor_id
        WHERE autores.id = $1`, [Number(id)]);

        const livro = await client.query(`SELECT * FROM livros WHERE autor_id = $1`, [Number(id)]);

        if (autor.rows.length === 0) {
            return res.status(404).json({ mensagem: "Livro não encontrado!" });
        };

        const retorno = {
            id: autor.rows[0].id,
            nome: autor.rows[0].nome,
            idade: autor.rows[0].idade,
            livros: [...livro.rows]
        };

        return res.status(200).json(retorno);

    } catch (error) {
        console.log(error.message)
    };
};

const cadastrarLivro = async (req, res) => {
    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body;

    try {
        await client.query(`
            INSERT INTO livros(nome,genero,editora,data_publicacao,autor_id)
            VALUES
                ('${nome}','${genero}','${editora}','${data_publicacao}','${Number(id)}')
            `);
        const livro = await client.query(`SELECT nome,genero,editora,data_publicacao FROM livros WHERE autor_id = $1`, [Number(id)]);
        const posicao = livro.rows.length - 1;
        const retornoFormatado = {
            id: livro.rows[posicao].id,
            nome: livro.rows[posicao].nome,
            genero: livro.rows[posicao].genero,
            editora: livro.rows[posicao].editora,
            data_publicacao: data_publicacao
        };
        return res.status(201).json(retornoFormatado);
    } catch (error) {
        console.log(error.message);
    };
};

const listarLivros = async (_req, res) => {
    try {
        const livros = await client.query(`
        SELECT livros.id, livros.nome, livros.genero, livros.editora, livros.data_publicacao, autores.id as autor_id,
        autores.nome as autor_nome,
        autores.idade as autor_idade
        FROM livros
        JOIN autores ON livros.autor_id = autores.id
        `);

        const livrosFormatados = livros.rows.map(livro => {
            return {
                id: livro.id,
                nome: livro.nome,
                genero: livro.genero,
                editora: livro.editora,
                data_publicacao: livro.data_publicacao,
                autor: {
                    id: livro.autor_id,
                    nome: livro.autor_nome,
                    idade: livro.autor_idade
                }
            };
        });

        return res.status(200).json(livrosFormatados);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { cadastrar, listarAutores, buscarAutorId, cadastrarLivro, listarLivros };