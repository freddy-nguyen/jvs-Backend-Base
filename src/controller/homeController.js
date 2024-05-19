import userService from "../service/userService"

const handleHelloWorld = (req, res) => {
    // return res.send("Hello World from controller");
    return res.render("home.ejs"); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleAbout = (req, res) => {
    // return res.send("Hello World from controller");
    return res.render("about.ejs"); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleUserPage = async (req, res) => {
    //MODEL => GET DATA FROM DATABASE
    let userList = await userService.getUserList();
    // {} because want it to be object. OBJECT IS NEEDED WHEN DATA FROM CONTROLLER TO VIEW
    return res.render("user.ejs", { userList }); //yield in RoR, so we could use HTML and JavaScript in .ejs
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    userService.createNewUser(email, password, username);
    return res.redirect("/user")
}

const handleDeleteUser = async (req, res) => {
    //the variable id would be = req.params.id
    //this is allowed thanks to body parser. Body parsers help you move params, body, query
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserByID(id);
    let userData = {};
    if (user && user.length > 0) {
        userData = user[0]; //user[0] can only be accessed if user is not empty => user length check must
    }
    return res.render("user-update.ejs", { userData });
}

const handleUpdateUser = async (req, res) => {
    let id = req.params.id; // the legit way to send stuff through web.js and refer to by req.params
    // console.log(id == req.body.id); the input hidden trick to send anything to refer by req.body
    let username = req.body.username; //not req .param, param is only when it's on the url
    let email = req.body.email; // not req. param, param is only when it's on the url
    let update = await userService.updateUser(username, email, id);
    return res.redirect("/user");
}



//controller could be used to declare const to be used in .ejs: const variable = "Freddy";
//ejs could do: <htmltag> My name is <%= variable %> <htmltag>
//=>NO NEED TO HARDCODE, MODEL => GET DATA FROM DATABASE


//this is used instead of export default because I am exporting the entire homeController.js to use all of its inside functions written below (handleHelloWorld)
//this allows something like this in other files: homeController.handleHelloWorld
//cons: must use: import homeController from "../controller/homeController"
module.exports = {
    handleHelloWorld, handleAbout, handleUserPage,
    handleCreateNewUser, handleDeleteUser,
    getUpdateUserPage, handleUpdateUser,
}
