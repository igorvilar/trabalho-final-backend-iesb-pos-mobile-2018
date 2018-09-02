const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const tasks = [];



var mysql = require("mysql");
//Database connection

app.use((req, res, next) => {
 res.locals.connection = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "root",
 database: "trabalho_final_backend"
 });
res.locals.connection.connect();
 next();
});


app.get("/filmes", (request, response) => {
  response.locals.connection.query('SELECT * from filmes', function (error, results, fields) {
		if (error) throw error;
		  response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  });
});

app.post('/filmes', (request, response) => {
    const { body } = request;

    const filmes = {
        id: Math.random().toString().replace('0.', ''),
        titulo: body.titulo,
        isDone: body.isDone,
    };

    /* TODO: INSERIR REGISTRO NO BD */
    filmes.push(filmes);
    response.status(201);
    response.send(filmes);
});

app.delete('/filmes/:id', (request, response) => {
    /*
        TODO: PROCURAR ARQUIVO NO BANCO
        SELECT * FROM filmes WHERE id = filme.id
    */
    const filme = filmes.find(t => t.id == request.params.id);

    if (filme) {
        /* 
            TODO: APAGAR REGISTRO NO BD
            DELETE FROM filmes WHERE id = filme.id
        */
        filmes.pop(filme);
        response.send(filmes);
    } else {
        response.status(404);
        response.send();
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

