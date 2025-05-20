const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// usdo de json no corpo de requisições
app.use(express.json())

// para dados de CSS
app.use(express.static('public'))

// para dados de formulário HTML
app.use(express.urlencoded({ extended: true }))

// rota GET http://localhost:3000/cadastro
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

    if (!nome || !email || !cidade || !estado || !idade) {
        return res.status(400).json({erro: 'preencha todos os campos'})
    }

    // verificação basica para ver se o cadastro deu certo
    console.log('Novo cadastro recebido: ', {
        nome,
        email, 
        cidade,
        estado,
        idade,
    })

    res.sendFile(path.join(__dirname, 'public/html/successCad.html'))
})

app.listen(port, () => {
    console.log('servidor rodando em http://localhost:3000')
})
