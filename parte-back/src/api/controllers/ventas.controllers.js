import VentasModel from "../models/ventas.models.js";
import DetalleVentaModel from "../models/detalle.models.js";

export const showAllventas = async (req, res) => {
    try {
        const rows = await VentasModel.findAll();

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo productos: ", error.message);
        res.status(500).json({ error: "Error interno al obtener productos" });
    }
};

export const createVenta = async (req, res) => {
    try {

        console.log("Datos recibidos desde el front:", req.body);

        const { nombre_usuario, fecha, precio, items } = req.body;
        const rows = await VentasModel.create({nombre_usuario, fecha, precio});
        const idVenta = rows.id;

        for (const item of items) {
            await DetalleVentaModel.create({
                venta_id: idVenta,
                producto_id: item.id,
                cantidad: item.cantidad,
                precio_unitario: item.precio
            });
        }

        res.status(201).json({ 
            mensaje: "Venta registrada con éxito",
            id_venta: idVenta
        });

    } catch (error) {
        console.error("Error al guardar la venta:", error);
        res.status(500).json({ error: "Error interno" });
    }
}