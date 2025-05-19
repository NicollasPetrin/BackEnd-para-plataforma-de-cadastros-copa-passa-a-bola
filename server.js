const express = require('express')
const app = express()
const port = 3000

// usdo de json no corpo de requisições
app.use(express.json())

// rota post http://localhost:3000/cadastro
app.post('/cadastro', (req, res) => {
    const {
        nome,
        nascimento,
        estado,
        cidade,
        cpf
    } = req.body

    if (!nome || !nascimento || !estado || !cidade || !cpf ) {
        return res.status(400).json({erro: 'preencha todos os campos'})
    }

    // verificação basica para ver se o cadastro deu certo
    console.log('Novo cadastro recebido: ', {
        nome, 
        nascimento,
        estado,
        cidade,
        cpf,
    })

    res.status(201).json({mensagem: 'Cadastro realizado com sucesso'})
})

app.listen(port, () => {
    console.log('servidor rodando em http://localhost:3000')
})

