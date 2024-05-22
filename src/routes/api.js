import express from "express";
const router = express.Router();
import apiController from "../controller/apiController"
/**
 * 
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
    //rest api
    //get post put delete - RCUD
    router.get('/test-api', apiController.testApi);
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    return app.use("/api/v1", router);
    //at work they use api/v1 and api/v1/test-api to make users only use which version
}

export default initApiRoutes;