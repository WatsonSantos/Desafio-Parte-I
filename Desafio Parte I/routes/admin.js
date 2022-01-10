const express = require('express')
const router = express.Router() 
const mongoose = require("mongoose")
require("..//models/Aluno")

const Aluno = mongoose.model("alunos")


router.get('/', (req, res)=>{
    res.render("admin/index")
})

router.get('/alunos', (req, res)=>{
   
    Aluno.findOne().find().lean().then((alunos)=>{
        res.render("admin/alunos", {alunos: alunos})

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao listar os alunos")
        res.redirect("/admin")
    })
    
})

//Rota para cadastrar aluno

router.post("/alunos/novo", (req, res)=>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"Nome inválido"})
    }

    if(!req.body.portugues || typeof req.body.portugues == undefined || req.body.portugues == null || req.body.portugues >100 || req.body.portugues < 0){
        erros.push({texto:"Nota inválida"})
    }

    if(!req.body.matematica || typeof req.body.matematica == undefined || req.body.matematica == null || req.body.matematica >100 || req.body.matematica < 0){
        erros.push({texto:"Nota inválida"})
    }

    if(erros.length > 0){
        res.render("admin/addalunos",{erros: erros})
    }else{

        const novoAluno = {
            
            nome: req.body.nome,
            portugues: req.body.portugues,
            matematica: req.body.matematica
        }
          
    
        new Aluno(novoAluno).save().then(()=>{
            req.flash("success_msg", "Aluno criado com sucesso")
            res.redirect("/admin/alunos")
        }).catch((erro)=>{
            req.flash("error_msg", "Houve um erro ao salvar o aluno,  tente novamente")
            res.redirect("/admin")
        })
    }
})


//Rota para edção de alunos
router.get("/alunos/edit/:id", (req, res)=>{
    Aluno.findOne({_id:req.params.id}).lean().then((aluno)=>{
        res.render("admin/editalunos",{aluno: aluno} )
    }).catch((err)=>{
        req.flash("error_msg","Este aluno não exite!")
        res.redirect("/admin/alunos")
    })
    
})

router.get('/alunos/add', (req, res)=>{
    res.render("admin/addalunos")
})

router.post("/alunos/edit", (req, res)=>{
    Aluno.findOne({_id: req.body.id}).then((aluno)=>{

         aluno.nome = req.body.nome,
         aluno.portugues = req.body.portugues,
         aluno.matematica = req.body.matematica

        aluno.save().then(()=>{
            req.flash("success_msg", "Aluno editado com sucesso!")
            res.redirect("/admin/alunos")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a edição do aluno")
            res.redirect("/admin/alunos")
        })
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar o aluno")
        res.redirect("/admin/alunos")
    })
})


router.post("/alunos/deletar", (req, res)=>{
    Aluno.deleteOne({__id: req.body.id}).then(()=>{
        req.flash("success_msg", "Aluno deletado com sucesso")
        res.redirect("/admin/alunos")
        
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao tentar deletar o aluno")
        res.redirect("/admin/alunos")
    })
})


module.exports = router