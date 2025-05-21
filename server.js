const express = require('express')
const app = express()

const axios = require('axios')

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

app.get('/odds', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/partidasAoVivo.html'))
})

app.get('/api/odds', async (req, res) => {
    try {
        const resposta = await axios.get('https://api.the-odds-api.com/v4/sports/soccer_epl/odds', {
            params: {
                regions: 'eu',
                markets: 'h2h',
                apiKey: 'd9db681aaf3252859b51e8b8b22a0b30'
            }
        })

        const partidas = resposta.data.slice(0, 5).map(partida => ({
            home_team: partida.home_team,
            away_team: partida.away_team,
            commence_time: partida.commence_time
        }))

        res.json(partidas)
    } catch (erro) {
        console.error('Erro ao buscar partidas: ', erro.response?.data || erro.message)
        res.status(500).json({ erro: 'Nao foi possivel buscar partidas.' })
    }
})

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000')
})
