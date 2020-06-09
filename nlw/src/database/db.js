//Importar a dependencia do Sqlite 3
const sqlite3 = require("sqlite3").verbose()
//Criar o objeto que ira fazer operações no BD
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//Utilizar o objeto de BD, para nossas operações
db.serialize(() => {
    //Criar uma tabela com CMDS SQL
    /*    db.run(`
              CREATE TABLE IF NOT EXISTS places (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  image TEXT,
                  name TEXT,
                  address TEXT,
                  address2 TEXT,
                  state TEXT,
                  city TEXT,
                  items TEXT
               );
      `)
      //Inserir Dados na tabele
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
          "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
          "Papersider", 
          "Guilherme Gemballa, Jardim América",
          "Nº 260",
          "Santa Catarina",
          "Rio do Sul",
          "Papéis e Papelão"
      ]
  
      function afterInsertData(err){
          if(err){
              return console.log(err)
          }
          console.log("Cadastrado com sucesso")
          console.log(this)
      }
      db.run(query, values, afterInsertData) */
      //Consultar Dados
   /* db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })*/
    
    //Deletar os Dados 
    /* db.run(`DELETE FROM places WHERE id = ?`, [12], function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })*/
     
}) 