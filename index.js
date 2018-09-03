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
        if (error) {
            response.status(404);
            response.send();
        }else{
          response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
	  });
});

app.get("/filmes/:id", (request, response) => {
    const { body } = request;

    response.locals.connection.query('SELECT * from filmes WHERE id=?', [body.id], function (error, results, fields) {
            if (error) {
                response.status(404);
                response.send();
            }else{
                response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            }
        });
  });

app.post('/filmes', (request, response) => {

    const { body } = request;

    const filme = {
        nome: body.nome,
        diretor: body.diretor,
        genero: body.genero,
        classificacao: body.classificacao
    };

    response.locals.connection.query(
        "INSERT INTO filmes SET ?", filme,
        function (error, results, fields) {
            if (error) {
                response.status(404);
                response.send();
            }else{
                response.locals.connection.query('SELECT * FROM filmes',
                function (error, results, fields) {
                    if (error){
                        response.status(404);
                        response.send();
                    }else{
                        response.send(JSON.stringify({"status": 201, "error": null, "response": results}));
                    } 
                  });
            }
        });
});

app.delete('/filmes/:id', (request, response) => {
    response.locals.connection.query(
        'DELETE FROM filmes WHERE id = ' + request.params.id,
        function (error, results, fields) {
            if (error) {
                response.status(404);
                response.send();
            }else{
                response.locals.connection.query('SELECT * from filmes', function (error, results, fields) {
                    if (error) {
                        response.status(404);
                        response.send();
                    }else{
                        response.send(JSON.stringify({"status": 201, "error": null, "response": results}));
                    }
                  });
            }
        });
});

app.put('/filmes/:id', function (request, response) {

    const { body } = request;

    response.locals.connection.query('UPDATE filmes SET nome=?, diretor=?, genero=?, classificacao=? where id=?', [body.nome, body.diretor, body.genero, body.classificacao, request.params.id], function (error, results, fields) {
        if (error) {
            response.status(404);
            response.send();
        }else{
            response.send(JSON.stringify({"status": 201, "error": null, "response": results}));
        }
  });
 });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

