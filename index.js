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


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

