const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Aluno = new Schema({
    nome:{
        type: String,
        required: true
    },
    portugues:{
        type: Number,
        required: true
    },
    matematica:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("alunos", Aluno)