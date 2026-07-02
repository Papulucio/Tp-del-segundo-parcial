import connection from "../database/db.js";

const selectAllventas = () => {
    const sql = "SELECT * FROM ventas";
    return connection.query(sql);
}

export default {
    selectAllventas
}