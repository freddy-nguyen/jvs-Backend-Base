import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import bluebird from "bluebird"

const hashUserPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPwd = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES(?, ?, ?)', [email, hashPwd, username]);
    // connection.query(
    //     // SQL here
    //     'INSERT INTO users (email, password, username) VALUES(?, ?, ?)', [email, hashPwd, username], function (err, results, fields) {
    //         if (err) {
    //             return 0;
    //         }
    //         else {
    //             return 1;
    //         }
    //     }); // results contains rows returned by server
}


//this thing (query) is called a callback. Nobody writes codes like this cause you can't async await callback. We need to write codes that run line after line (execute).
const getUserList = async () => {
    let users = []; //this how we capture sql to controller and then to ejs
    // return connection.query(
    //     'SELECT * FROM users', function (err, results, fields) {
    //         if (err) {
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // )

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    //jwt: the name of db on phpmyadmin 

    // [] means they gonna return a 2-elem array
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return rows; //rows are queries, fields are database lower info (dont care)
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    return rows; //rows are queries, fields are database lower info (dont care)
}

const getUserByID = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows; //rows are queries, fields are database lower info (dont care)
}

const updateUser = async (username, email, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    const [rows, fields] = await connection.execute('UPDATE users SET username = ?, email = ? WHERE id = ?;', [username, email, id]);
    return rows; //rows are queries, fields are database lower info (dont care)
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserByID, updateUser,
}
