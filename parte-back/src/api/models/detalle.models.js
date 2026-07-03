import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const DetalleVentaModel = sequelize.define("DetalleVenta", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venta_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    precio_unitario: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: "detalle_ventas",
    timestamps: false
});

export default DetalleVentaModel;