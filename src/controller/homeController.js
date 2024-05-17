import userService from "../service/userService"

const handleHelloWorld = (req, res) => {
    // return res.send("Hello World from controller");
    return res.render("home.ejs"); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleAbout = (req, res) => {
    // return res.send("Hello World from controller");
    return res.render("about.ejs"); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleUser = (req, res) => {
    // return res.send("Hello World from controller");

    //MODEL => GET DATA FROM DATABASE
    return res.render("user.ejs"); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let newUser = userService.createNewUser(email, password, username);
    return res.send('freddy');
}


//controller could be used to declare const to be used in .ejs: const variable = "Freddy";
//ejs could do: <htmltag> My name is <%= variable %> <htmltag>
//=>NO NEED TO HARDCODE, MODEL => GET DATA FROM DATABASE


//this is used instead of export default because I am exporting the entire homeController.js to use all of its inside functions written below (handleHelloWorld)
//this allows something like this in other files: homeController.handleHelloWorld
//cons: must use: import homeController from "../controller/homeController"
module.exports = {
    handleHelloWorld, handleAbout, handleUser, handleCreateNewUser
}
