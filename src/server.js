import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
// to be able to run process.env in nodejs (if not , it would just use 8080 for PORT)
require("dotenv").config();
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api"
import configCors from "./config/cors"

const app = express(); //structure of the website
const PORT = process.env.PORT || 8080; // || is or condition: PORT EITHER = process.env.PORT or 8080 if the former undefined

//config cors
configCors(app);

//config view engine
configViewEngine(app); //config view engine, the one in viewEngine.js

//config body parser in order to use req.body in homecontroller
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// test connection db
connection();

//init web routes
initWebRoutes(app); // declare routes that user can get in, the one in web.js
initApiRoutes(app);

// const PORT = 8080; //moved this guy to .env
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})