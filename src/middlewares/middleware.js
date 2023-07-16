const verificaCampoNome = (req, res, next) => {
    const { nome } = req.body;

    if (nome === undefined) {
        return res.status(404).json({ mensagem: "Campo nome obrigatório" });
    };

    if (nome === "") {
        return res.status(400).json({ mensagem: "O nome não pode ser vazio!" });
    };

    next();
};


module.exports = { verificaCampoNome };