import connection from "../database/db.js";

const getAdminUsers = (email, password) => {
    const sql = "SELECT * FROM usuario WHERE email = ? and contraseña = ?";

    return connection.query(sql, [email, password]);
}

export default getAdminUsers