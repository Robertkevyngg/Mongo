//string de conexão com o mongo
//mongodb://jsmongo:1234@jsmongo/?ssl=true&replicaSet=atlas-sm0gny-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
const express = require ('express')
const cors = require ('cors')
const mongoose = require('mongoose')
const app = express()

app.use (express.json())
app.use (cors())

const Filme = mongoose.model('Filme', mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))
async function connectAoMongo () {
    await mongoose.connect(`mongodb+srv://jsmongo:1234@cluster0.pdq6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}
//get http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Divertidamente",
        sinopse: "Com a mudança para uma nova cidade, as emoções de Riley, que tem apenas 11 anos de idade, ficam extremamente agitadas. Uma confusão na sala de controle do seu cérebro deixa a Alegria e a Tristeza de fora, afetando a vida de Riley radicalmente."
    },
    {
        titulo: "Oppenheimer",
        sinopse: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica."
    }
] 
app.get("/filmes",async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post("/filmes", async (req, res) => {
    //captura o que o usuário enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })
    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

app.listen(3000, () =>  {
    try {
        connectAoMongo()
        console.log("up and running e conectado ao mongo")
    }
    catch (e) {
        console.log('Erro ao conectar ao MongoDB:', e)
    }
})