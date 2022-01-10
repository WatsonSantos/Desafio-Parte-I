
const bodyParser = require('body-parser')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const { Mongoose } = require('mongoose')
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")

//Configurações

  //Sessão 

  app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true

  }))

  app.use(flash())

  //Middleware
      app.use((req, res, next)=>{
        //craindo variável global usando locals
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg") 
        next()
      })

  //Body Parser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  //Handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  //Mongoose

      mongoose.connect("mongodb://localhost/desafioApp").then(()=>{
        console.log("Conectado ao mongo")
      }).catch((erro)=>{
        console.log("Erro ao se conectar ao mongo: "+erro)
      })

  //Public
    
  app.use(express.static(path.join(__dirname,"public")))

  //Middlewares
  app.use((req, res, next)=>{

    console.log("..........")

    next() //manda passar a requisição

    //cada vez que carrego uma página o middleware é chamado

  })



//Rotas
    
app.get('/', (req, res)=>{
  res.send("Rota principal")
})

app.use('/admin', admin) 

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta "+PORT)
})