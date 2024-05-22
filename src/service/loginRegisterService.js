import db from "../models/index" // index is sequelize file
import bcrypt from "bcryptjs"

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
            }
        }
        if (await checkPhoneExists(rawUserData.phone)) {
            return {
                EM: "Account with such phone number is already in use.",
                EC: 1,
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
        }
    } catch (e) {
        return {
            EM: "Something went wrong. Please try again later.",
            EC: -2,
        }
    }
}

module.exports = {
    registerNewUser,
}