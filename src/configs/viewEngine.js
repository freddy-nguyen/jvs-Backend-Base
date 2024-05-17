//all these to choose which file to hide and which file to show to browser (inly show public)
import express from "express"

//sequently type / * * enter
/**
 * 
 * @param {*} app - express app
 */

//go here:https://expressjs.com/en/starter/static-files.html
//then configure
const configViewEngine = (app) => { //arrow function instead of normal function because react also uses arrow function (also many benefits!) 
    //app is our app express
    app.use(express.static('./src/public')); // /public -> ./src/public
    app.set("view engine", "ejs"); // view engine on express
    //tell express im gonna use html via ejs(the library i installed) -> i use the view engine called ejs
    app.set("views", "./src/views"); // all my view engines/files shall be stored in ./src/views folder
    //from now on, everytime i give out an ejs file, you(express) shall find it in ./src/views folder (more folders for express to find shall be declared here)
}

export default configViewEngine; //default to export only 1 function var
//dont export function()
//meaning, line 10 configViewEngine(app); in server.js = every line inside configViewEngine;

//VIEW ENGINE IS basically EJS