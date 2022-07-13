const express = require("express");
const app = express();
const routes = require("./src/routes/routes"); // rutas 


app.use(express.static("public"));
app.use("/api/productos", routes);

// <------------------------- Configuracion de HandleBars ------------------------->

// const exphbs = require("express-handlebars");

// app.set("views", "./views/handlebars");
// app.engine(
//   ".hbs",
//   exphbs({
//     defaultLayout: "main",
//     layoutsDir: "./views/handlebars/layouts",
//     partialsDir: "./views/handlebars/partials",
//     extname: ".hbs",
//   })
// );
// app.set("view engine", ".hbs");

// <------------------------- Configuracion de Pug ------------------------->

 app.set("view engine", ".pug");
 app.set("views", "./views/pug");

// <------------------------- configuracion de EJS ------------------------->

//app.set("view engine", ".ejs");
//app.set("views", "./views/ejs");

// <------------------------- Servidor ------------------------->

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor: ${error}`));