import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";

//////////////////////
// Create new product
export const createAdminUser = async (req, res) => {

    try {
        // Recogemos los datos limpios del body
        const { nameUser, emailUser, passUser, esAdmin } = req.body;

        // Bcrypt 1 -> Vamos a hashear el nuevo password del user admin
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passUser, saltRounds);

        const rows = await UserModel.create({
            nombre: nameUser,
            email: emailUser,
            contraseña: hashedPassword,
            esAdmin: esAdmin
        });
        
        // Optimizacion 4: En lugar de 201, devolvemos un 201 "Created"
        res.status(201).json({
            message: `Usuario creado con exito`,
            userId: rows.id
        });

    } catch (error) {
        console.log(error);

        // Optimizacion 5: Devolvemos un codigo de estado 500
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const showAllUsers = async (req, res) => {
    try {
        const [rows] = await UserModel.findAll();

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios" });
        }

        res.status(200).json({
            total: rows.length,
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo usuarios: ", error.message);
        res.status(500).json({ error: "Error interno al obtener usuarios" });
    }
};