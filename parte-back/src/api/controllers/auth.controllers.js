import userModels from "../models/user.models.js";
import bcrypt from "bcrypt";

export const loginView = (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduce tus credenciales",
        archivoCss: "/css/login.css"
    })
}

export const getAdminUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                archivoCss: "/css/login.css",
                error: "Todos los campos son obligatorios"
            });
        }
        
        const user = await userModels.findOne({where: {email: email}});

        if (!user) {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                archivoCss: "/css/login.css",
                error: "Credenciales incorrectas"
            });
        }

        console.table(user);

        const match = await bcrypt.compare(password, user.contraseña);
        console.log(match)

        if (!match) {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                archivoCss: "/css/login.css",
                error: "Credenciales incorrectas"
            });
        }
        
        if (user.es_admin) {
            req.session.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                esAdmin: user.es_admin
            };

            return res.redirect("/dashboard/index");
        } else {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                archivoCss: "/css/login.css",
                error: "No tienes permisos de administrador para acceder"
            });
        }

    } catch (error) {
        console.log(error)
    }
}


export const destroyLogin = (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.log("Error al destruir la sesión: ", error);

            return res.status(500).json({
                message: "Error al cerrar la sesión"
            });
        }

        res.redirect("/login")
    });
}