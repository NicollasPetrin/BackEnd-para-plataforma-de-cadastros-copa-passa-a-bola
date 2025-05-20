const nome = document.getElementById('nome').value 
const email = document.getElementById('email').value
const cidade = document.getElementById('cidade').value
const estado = document.getElementById('estado').value
const idade = document.getElementById('idade').value


fetch('http://localhost:3000/cadastro', {
    method: 'POST',
    Headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nome,
        email,
        cidade,
        estado,
        idade,
    })
})
.then(res => res.json())
.then(data => alert(data.mensagem))
.catch(err => console.log('erro ao enviar:', err))
