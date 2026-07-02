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