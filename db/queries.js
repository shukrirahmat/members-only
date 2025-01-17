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
    INSERT INTO users (firstname, lastname, username, password, membership_status, admin_status)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const firstNameCap = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
    const lastNameCap = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);

    await pool.query(query, [firstNameCap, lastNameCap, user.username, hashedPassword, false, false]);
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
    await pool.query(query, [true, user.id]);
}

async function  addNewMessage(message, user) {
    const query = `
    INSERT INTO messages (author_id, message, date_posted)
    VALUES ($1, $2, NOW())
    `
    await pool.query(query, [user.id, message]);
}

async function getAllMessages() {
    const query =`
    SELECT messages.id, users.username, messages.message, messages.date_posted, TO_CHAR(date_posted, 'DD/MM/YYYY  HH:MI') AS formatted_date
    FROM messages
    INNER JOIN users
    ON users.id = messages.author_id
    ORDER BY messages.date_posted DESC;
    `
    const {rows} = await pool.query(query);
    return rows;
}

async function deleteMessage(id) {
    const query = `
    DELETE FROM messages
    WHERE id = $1;
    `
    await pool.query(query, [id]);
}

async function upgradeToAdmin(user) {
    const query = `
    UPDATE users
    SET admin_status = $1
    WHERE id = $2
    `
    await pool.query(query, [true, user.id]);
}

module.exports = {
    checkIfUserNameExists,
    addUser,
    findUserWithUsername,
    findUserWithID,
    joinUser,
    addNewMessage,
    getAllMessages,
    deleteMessage,
    upgradeToAdmin
}