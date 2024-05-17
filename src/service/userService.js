import mysql from "mysql2"
import bcrypt from "bcryptjs"

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt' //the name of db on phpmyadmin
});

const hashUserPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPwd = hashUserPassword(password);
    connection.query(
        // SQL here
        'INSERT INTO users (email, password, username) VALUES(?, ?, ?)', [email, hashPwd, username], function (err, results, fields) {
            if (err) {
                return 0;
            }
            else {
                return 1;
            }
        }); // results contains rows returned by server
}

const getUserList = () => {
    connection.query(
        'SELECT * FROM users', function (err, results, fields) {
            if (err) {
                return 0;
            }
        }
    )
}

module.exports = {
    createNewUser, getUserList
}
