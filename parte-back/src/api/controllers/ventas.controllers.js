import ventasModels from "../models/ventasModels.js";

export const showAllventas = async (req, res) => {
    try {
        const [rows] = await ventasModels.selectAllventas();

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

export const createVenta =async (req, res) => {
    try {
        const { nombre_usuario, fecha, precio, items } = req.body;
        const [rows] = await ventasModels.insertVenta(nombre_usuario, fecha, precio);
        const idVenta = rows.insertId;

        for (const item of items) {
            await ventasModels.insertDetalleVenta(idVenta, item.id, item.cantidad, item.precio);
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