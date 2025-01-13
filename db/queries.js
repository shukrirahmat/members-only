const pool = require("./pool");

async function checkIfUserNameExists(username) {
    const query =
    `
    SELECT username FROM users
    WHERE username LIKE $1
    `;

    const {rows} = await pool.query(query,[username]);
    return rows;
}

async function addUser(user, hashedPassword) {
    const query = 
    `
    INSERT INTO users (firstname, lastname, username, password, membership_status)
    VALUES ($1, $2, $3, $4, 'PENDING')
    `;

    const firstNameCap = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
    const lastNameCap = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);

    await pool.query(query, [firstNameCap, lastNameCap, user.username, hashedPassword]);
}

async function findUserWithUsername(username) {
    const query = `SELECT * FROM users WHERE username = $1`;
    const {rows} = await pool.query(query, [username]);
    return rows;
}

async function findUserWithID(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const {rows} = await pool.query(query, [id]);
    return rows;
}

async function joinUser(user) {
    const query = `
    UPDATE users
    SET membership_status = $1
    WHERE id = $2
    `
    await pool.query(query, ['MEMBER', user.id]);
}

module.exports = {
    checkIfUserNameExists,
    addUser,
    findUserWithUsername,
    findUserWithID,
    joinUser
}