import productModels from "../models/product.models.js";

export const indexView = async (req, res) => {
    
    try {
        const [rows] = await productModels.selectAllproducts();
        res.render("index", {
        title: "Inicio",
        about: "Todos los productos",
        productsArray: rows,
        archivoCss: "/css/index.css"
    });        
    } catch (error) {
        console.log(error)
    }
}

export const getView = (req, res) => {
    res.render("get", {
        title: "Consultar",
        about: "Consultar producto por ID:",
        archivoCss: "/css/get.css"
    });
}

export const createView = (req, res) => {
    res.render("post",{
        title: "Crear",
        about: "Crear producto",
        archivoCss: "/css/post.css"
    });
}

export const updateView = (req, res) => {
    res.render("put", {
        title: "Actualizar",
        about: "Actualizar producto",
        archivoCss: "/css/put.css"
    });
}

export const deleteView = (req, res) => {
    res.render("delete",{
        title: "Eliminar",
        about: "Eliminar producto",
        archivoCss: "/css/delete.css"
    });
}

