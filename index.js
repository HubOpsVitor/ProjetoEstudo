const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const{default:mongoose} = require("mongoose");


const app = express();
app.use(express.json());
app.use (helmet());
app.use(morgan("combined"));

const urldb = `mongodb+srv://elementar:123senac@projetoestudo.qp8p0.mongodb.net/database?retryWrites=true&w=majority&appName=ProjetoEstudo`
mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
        nomecliente:{type:String,required:true},
        email:{type:String, unique:true,required:true},
        cpf:{type:String, unique:true,required:true},
        telefone:{type:String},
        idade:{type:Number,min:16, max:120},
        usuario:{type:String, unique:true},
        senha:{type:String},
        datacadastro:{type:Date,default:Date.now}
    });

const Cliente = mongoose.model('Cliente',schema);

app.get("/", (req, res) => {
    Cliente.find()
        .then((result) => {
            res.status(200).send({ output: "ok", payload: result });
        })
        .catch((erro) => {
            res.status(500).send({ output: `Erro ao processar dados`, error: erro });
        });
});

app.post("/cadastro", (req, res) => {
    const dados = new Cliente(req.body);
    dados
    .save()
    .then((result) => {
        res.status(201).send({ output: "Cadastro realizado", payload: result });
    })
    .catch((erro) =>
        res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` })
    );
});

app.put("/atualizar/:id", (req, res) => {
    res.status(200).send({
        mensagem:"Você está no verbo PUT",
        id: req.params.id,
        payload: req.body,
    });
});
app.delete ("/apagar/:id", (req, res) => {
    res.status(204).send({});
});

app.use((req, res) => {
    res.type(express.application/json);
    res.status(404).send("404 - Not Found");
});

app.listen(3000, () => 
    console.log(`Servidor online. em http://127.0.0:3000`)
);