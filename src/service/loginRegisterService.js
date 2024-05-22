import { noTrueLogging } from "sequelize/lib/utils/deprecations";
import db from "../models/index" // index is sequelize file
import bcrypt from "bcryptjs"
import { Op, where } from 'sequelize'

// format: sequelize.exportedModelName.func (eg: db.User.findOne)
const checkEmailExists = async (userEmail) => {
    const isExist = await db.User.findOne({ where: { email: userEmail } });
    if (isExist) { return true; }
    return false;
}

const checkPhoneExists = async (userPhone) => {
    const isExist = await db.User.findOne({ where: { phone: userPhone } });
    if (isExist) { return true; }
    return false;
}

// const checkCorrectPassword = async (hashPassword, valueLogin) => {
//     const existingEmail = await db.User.findOne({ where: { email: userEmail } });
//     const existingPhone = await db.User.findOne({ where: { phone: userPhone } });
//     if (existingEmail) {
//         if (existingEmail.password == hashPassword) {
//             return true;
//         }
//         return false;
//     }
//     if (existingPhone) {
//         if (existingPhone.password == hashPassword) {
//             return true;
//         }
//         return false;
//     }
//     return false;
// }

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const hashUserPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    let hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
}

const registerNewUser = async (rawUserData) => {
    try {//check email/phone num exists already
        if (await checkEmailExists(rawUserData.email)) {
            return {
                EM: "Account with such email is already in use.",
                EC: 1,
                DT: '',
            }
        }
        if (await checkPhoneExists(rawUserData.phone)) {
            return {
                EM: "Account with such phone number is already in use.",
                EC: 1,
                DT: ''
            }
        }
        //hash user password
        let hashPassword = await hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
        });

        return {
            EM: "User created successfully!",
            EC: 0,
            DT: ''
        }
    } catch (e) {
        return {
            EM: "Something went wrong. Please try again later.",
            EC: -2,
            DT: ''
        }
    }
}

const loginUser = async (rawUserData) => {
    try {
        //bcrypt.compareSync dont need to hash inputPassword
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin }
                ]
            }
        })

        if (user) {
            let isCorrectPassword = await checkPassword(rawUserData.password, user.password);
            if (isCorrectPassword) {
                return {
                    EM: "Login successfully!",
                    EC: 0,
                    DT: '',
                }
            }
        }
        return {
            EM: "Email address, phone number, or password is incorrect. Try again.",
            EC: 1,
        }

    } catch (e) {
        return {
            EM: "Something went wrong. Please try again later.",
            EC: -2,
        }
    }
}

module.exports = {
    registerNewUser, loginUser,
}