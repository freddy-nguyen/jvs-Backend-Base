import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
// to be able to run process.env in nodejs (if not , it would just use 8080 for PORT)
require("dotenv").config();

const app = express(); //structure of the website
const PORT = process.env.PORT || 8080; // || is or condition: PORT EITHER = process.env.PORT or 8080 if the former undefined
//config view engine
configViewEngine(app); //config view engine, the one in viewEngine.js

//init web routes
initWebRoutes(app); // declare routes that user can get in, the one in web.js

// const PORT = 8080; //move this guy to .env
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})