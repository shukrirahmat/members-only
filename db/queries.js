const pool = require("./pool");

async function checkIfUserNameExists(username) {
    const query =
    `
    SELECT user_name FROM users
    WHERE user_name LIKE $1
    `;

    const {rows} = await pool.query(query,[username]);
    return rows;
}

async function addUser(user) {
    const query = 
    `
    INSERT INTO users (first_name, last_name, user_name, password, membership_status)
    VALUES ($1, $2, $3, $4, 'PENDING')
    `;

    const firstNameCap = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
    const lastNameCap = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);

    await pool.query(query, [firstNameCap, lastNameCap, user.user_name, user.password]);
}

module.exports = {
    checkIfUserNameExists,
    addUser
}