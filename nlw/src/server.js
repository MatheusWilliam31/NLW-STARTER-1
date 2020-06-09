const express = require("express")
const server = express()

//Pegar o BD
const db = require("./database/db")

//Configure File Public
server.use(express.static("public"))

//Habilitar o req.body na aplicação
server.use(express.urlencoded({ extended: true }))

//Utilizando TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
//Configure for my Application
//PAGE HOME
server.get("/", (req, res) => { //req = Requisição || res = Resposta
    return res.render("index.html", { title: "Um titulo" })
})
server.get("/create-point", (req, res) => {
    //REQ QUERY: Query Strings da nossa URL
    //req.query()
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: Corpo do Form.
    //console.log(req.body)

    //Inserir dados no BD
    const query =
        `INSERT INTO places (
              image,
              name,
              address,
              address2,
              state,
              city,
              items
          ) VALUES(?,?,?,?,?,?,?)`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)


})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquise vazia
        return res.render("search-results.html", { total: 0 })
    }
  
    //Pegar os Dados do BD
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //Mostrar a page HTML com os dados do BD
        return res.render("search-results.html", { places: rows, total: total })

    })
})

//Ligar o Server
server.listen(3000)