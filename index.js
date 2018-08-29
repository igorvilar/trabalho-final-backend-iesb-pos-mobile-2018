const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const filmes = [];


app.get("/filmes", (request, response) => {
    response.send(filmes);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

