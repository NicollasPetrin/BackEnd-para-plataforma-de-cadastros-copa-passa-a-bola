const express = require('express')
const app = express()

const path = require('path')

const { v4: uuidv4 } = require('uuid')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// rota GET http://localhost:3000/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'))
})

// rota GET http://localhost:3000/cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/cadastro.html'))
})

// rota POST http://localhost:3000/cadastro
app.post('/cadastro', (req, res) => {
    const {
        nome,
        email,
        cidade,
        estado,
        idade,
    } = req.body

    const novoUsuario = {
        id: uuidv4(),
        nome,
        email,
        cidade,
        estado,
        idade
    }

    if (!nome || !email || !cidade || !estado || !idade) {
        return res.status(400).json({erro: 'preencha todos os campos'})
    }

    // verificação basica para ver se o cadastro deu certo
    console.log('Novo cadastro recebido: ', novoUsuario)

    res.sendFile(path.join(__dirname, 'public/html/successCad.html'))
})

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})
