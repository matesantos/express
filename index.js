const express = require('express')
const app = express()
const saudacao = require('./saudacaoMid')
const bodyParser = require('body-parser')

const { salvar, obter } = require('./api/usuarioAPI')
require('./api/produto')(app, "com params!")

app.get('/usuario', obter)
app.post('/usuario', salvar)

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))
app.use(saudacao('Mateus'))

app.use('/opa', (req, res, next) => {
    console.log("Antes...")
    next()
})

app.get('/clientes/relatorio', (req, res) =>{
    res.send(`Cliente relatório: completo ${req.query.completo} ano = ${req.query.ano}!`)
})

app.get('/clientes/:id', (req, res) =>{
    res.send(`O Cliente ${req.params.id} selecionado!`)
})

app.post('/corpo', (req, res)=>{
    // let corpo = ''
    // req.on('data', function(parte){
    //     corpo += parte
    // })

    // req.on('end', function(){
    //     res.send(corpo)
    // })

    res.send(req.body)
})

app.get('/opa',(req, res, next) => {

    console.log("Durante...")
    res.json({
        data: [
            {id: 7, name: 'Ana', position: 1 },
            {id: 34, name: 'Bia', position: 2 },
            {id: 73, name: 'Carlos', position: 3 }
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    })

    next()

     // res.json({
    //     name: 'iPad 32Gb',
    //     price: 1899.00,
    //     discount: 0.12
    // })

    // res.send('<h1>Estou bem!</h1><br><br><h2>Tipo é HTML!</h2>')
})

app.use('/opa', (req, res, next) => {
    console.log("Depois....")
    next()
})

app.listen(3000,() => {
    console.log("Executando...")
})