import connection from "../database/db.js";

const selectAlldetalles = () => {
    const sql = "SELECT * FROM detalle_ventas";
    return connection.query(sql);
}

export default {
    selectAlldetalles
}