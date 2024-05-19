import express from "express";
import homeController from "../controller/homeController"
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

//handle functions are our controllers in MVC
//already put these two in controller(home and about controller) and view (home and about ejs)
// const handleHelloWorld = (req, res) => {
//     return res.send("Hello World");
// }
// const handleAbout = (req, res) => {
//     return res.send("The name Freddy");
// }

//replace the guy below with model (path, handler) -> look more MVC
//get is getting our data from server to show to client
//post create
const initWebRoutes = (app) => {
    // router.get("/", handleHelloWorld);
    router.get("/", homeController.handleHelloWorld); //this guy is bc I put controllers named handle in controller.js inside controller folder. homeController.handleHelloWorld is a thing bc I used modules.export = {}
    // router.get("/about", handleAbout);
    router.get("/about", homeController.handleAbout);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);//thanks to using form method="POST", action="/users/create-user", post could take user input and post to our db
    router.post("/users/delete-user/:id", homeController.handleDeleteUser);// : tells express that id is a variable
    router.get("/users/update-user/:id", homeController.getUpdateUserPage);
    router.post("/users/update-user/:id", homeController.handleUpdateUser);
    return app.use("/", router);
}


/**LOOKS NOTHING LIKE MVC SO I DIPPED*/
// const initWebRoutes = (app) => {
//     router.get("/", (req, res) => { // our home is /
//         return res.send("Hello World");
//     })
//     router.get("/about", (req, res) => { // our home is /
//         return res.send("The name Freddy");
//     })

//     return app.use("/", router);
// }

export default initWebRoutes;