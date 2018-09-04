const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


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
  response.locals.connection.query('SELECT * FROM filmes', function (error, results, fields) {
        if (error) {
            response.status(404);
            response.send();
        }else{
          response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        }
	  });
});

app.get("/filmes/:id", (request, response) => {
    response.locals.connection.query(
        'SELECT * FROM filmes WHERE id = ' + request.params.id,
        function (error, results, fields) {
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

    response.locals.connection.query(
        'SELECT * FROM filmes WHERE id = ' + request.params.id,
        function (error, results, fields) {
            if (error) {
                response.status(404);
                response.send();
            }else{

                if(body.nome == '' || body.nome == undefined){
                    body.nome = results[0].nome;
                }
                if(body.diretor == '' || body.diretor == undefined){
                    body.diretor = results[0].diretor;
                }
                if(body.genero == '' || body.genero == undefined){
                    body.genero = results[0].genero;
                }
                if(body.classificacao == '' || body.classificacao == undefined){
                    body.classificacao = results[0].classificacao;
                }

                response.locals.connection.query('UPDATE filmes SET nome=?, diretor=?, genero=?, classificacao=? where id=?', [body.nome, body.diretor, body.genero, body.classificacao, request.params.id], function (error, results, fields) {
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
 app.patch('/filmes/:id', function (request, response) {

    const { body } = request;

    response.locals.connection.query(
        'SELECT * FROM filmes WHERE id = ' + request.params.id,
        function (error, results, fields) {
            if (error) {
                response.status(404);
                response.send();
            }else{

                if(body.nome == '' || body.nome == undefined){
                    body.nome = results[0].nome;
                }
                if(body.diretor == '' || body.diretor == undefined){
                    body.diretor = results[0].diretor;
                }
                if(body.genero == '' || body.genero == undefined){  
                    body.genero = results[0].genero;
                }
                if(body.classificacao == '' || body.classificacao == undefined){
                    body.classificacao = results[0].classificacao;
                }

                response.locals.connection.query('UPDATE filmes SET nome=?, diretor=?, genero=?, classificacao=? where id=?', [body.nome, body.diretor, body.genero, body.classificacao, request.params.id], function (error, results, fields) {
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


  app.head('/filmes', function (request, response) {
    if (error) {
        response.status(404);
        response.send();
    }else{
        response.send(JSON.stringify({"status": 200, "error": null, "response": res}));
    }
  })

  app.options("/filmes", function(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,PATH,POST,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.send(200);
  });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

