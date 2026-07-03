import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    es_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: "usuario",
});

export default Usuario;


/*
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
*/