import connection from "../database/db.js";

const getAdminUsers = (email, password) => {
    const sql = "SELECT * FROM usuario WHERE email = ?";

    return connection.query(sql, [email]);
}

const createAdminUser = (name, email, password, esAdmin) => {
    const sql = "INSERT INTO usuario (nombre, email, contraseña, es_admin) VALUES (?, ?, ?, ?)";
    
    // Optimizacion 3: Devolvemos la respuesta en un rows para devolver info util como el id asignado al nuevo producto
    return connection.query(sql, [name, email, password, esAdmin]);
}

const selectAllusers = () => {
    // Optimizacion 3: Sacamos * para evitar traer columnas innecesarias -> Mas eficiente en memoria y peticion de red. Ademas separamos la sentencia en una variable
    const sql = "SELECT * FROM usuario";
    return connection.query(sql);
}

export default {
    getAdminUsers,
    createAdminUser,
    selectAllusers
}