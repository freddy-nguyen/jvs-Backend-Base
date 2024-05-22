import loginRegisterService from '../service/loginRegisterService'
import db from "../models/index" // index is sequelize file

const testApi = (req, res) => {
    //this format is used to send message to user
    return res.status(200).json({ message: 'ok', data: 'testApi' }) //send message to user
}

//req.body =  {email, username, phone, password}
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required parameters', //error msg
                EC: "1", //error code
                DT: '' // data
            })
        }

        //take the data passed in
        let data = await loginRegisterService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM, //error msg
            EC: data.EC, //error code
            DT: '' // data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', //error msg
            EC: "-1", //error code
            DT: '' // data
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        if (!req.body.valueLogin || !req.body.password) {
            return res.status(200).json({
                EM: 'missing required parameters', //error msg
                EC: 1, //error code
                DT: '' // data
            })
        }
        let data = await loginRegisterService.loginUser(req.body);

        return res.status(200).json({
            EM: data.EM, //error msg
            EC: data.EC, //error code
            DT: data.DT // data
        })

    } catch (e) {
        return res.status(500).json({
            EM: data.EM, //error msg
            EC: data.EC, //error code
            DT: data.DT // data
        })
    }
}



module.exports = {
    testApi, handleRegister, handleLogin
}