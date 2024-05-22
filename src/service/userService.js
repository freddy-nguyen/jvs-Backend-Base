import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import bluebird from "bluebird"
import db from '../models/index'

const hashUserPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPwd = await hashUserPassword(password);
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    // const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES(?, ?, ?)', [email, hashPwd, username]);

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

    await db.User.create({ email: email, password: hashPwd, username: username });
    return 1;
}


//this thing (query) is called a callback. Nobody writes codes like this cause you can't async await callback. We need to write codes that run line after line (execute).
const getUserList = async () => {
    // let users = []; //this how we capture sql to controller and then to ejs
    // return connection.query(
    //     'SELECT * FROM users', function (err, results, fields) {
    //         if (err) {
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // )

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    // //jwt: the name of db on phpmyadmin 

    // // [] means they gonna return a 2-elem array
    // const [rows, fields] = await connection.execute('SELECT * FROM users');
    // return rows; //rows are queries, fields are database lower info (dont care)

    try {
        let users = await db.User.findAll();
        return users;
    }
    catch (e) {
        console.log(">>>bug here:", e);
    }
}
const deleteUser = async (id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    // const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    // return rows; //rows are queries, fields are database lower info (dont care)
    await db.User.destroy({
        where: {
            id: id,
        },
    });
    return 1;
}

const getUserByID = async (id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    // const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    // return rows; //rows are queries, fields are database lower info (dont care)
    // const user = await db.User.findAll({
    //     where: {
    //         id: id,
    //     },
    // });
    // return user;
    let user = await db.User.findOne({
        where: {
            id: id,
        },
    });
    return user.get({ plain: true });
};

const updateUser = async (username, email, id) => {
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird, });
    // const [rows, fields] = await connection.execute('UPDATE users SET username = ?, email = ? WHERE id = ?;', [username, email, id]);
    // return rows; //rows are queries, fields are database lower info (dont care)
    await db.User.update(
        { email: email, username: username, },
        {
            where: {
                id: id,
            },
        },
    );
    return 1;
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserByID, updateUser,
}
