import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const VentaModel = sequelize.define("Venta", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "ventas", 
    timestamps: false
});

export default VentaModel;

/*
const selectAllventas = () => {
    const sql = "SELECT * FROM ventas";
    return connection.query(sql);
}

const insertVenta = (nombre_usuario, fecha, precio, items) => {
    const sql = "INSERT INTO ventas (nombre_usuario, fecha, precio) VALUES (?, ?, ?)";
    return connection.query(sql, [nombre_usuario, fecha, precio]);
}

const insertDetalleVenta = (venta_id, producto_id, cantidad, precio_unitario) => {
    const sql = "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [venta_id, producto_id, cantidad, precio_unitario]);
}

export default {
    selectAllventas,
    insertVenta,
    insertDetalleVenta
}
*/