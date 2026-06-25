import express from "express";
import connection from "./scr/api/database/db.js";
import enviroments from "./scr/api/config/enviroments.js";
import cors from "cors";

const app = express();
const PORT = enviroments.port;

// Middlewares
app.use(cors()); // Middleware basico para permitir todas las solicitudes

// Middleware logger para analizar todas las solicitudes por consola (tener el historial del consumo de nuestra Api REST en la consola)
app.use((req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next(); // next() da paso a que continue la respuesta o el siguiente middleware (en caso de haberlo)
});

// Middleware para parsear JSON en las solcitudes POST y PUT
app.use(express.json()); // sin esto, recibe como undefined



app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.get("/api/productos", async (req,res) => {
    try {
        
/*
El método query de mysql2 no te devuelve solo los datos de la tabla;
te devuelve un array con dos cosas: [los_datos_de_la_tabla, la_meta_data_de_las_columnas].
Al poner [rows], le estás diciendo: "De ese par de cosas que me devolvés, 
guardame la primera (las filas de datos) en una variable llamada rows e ignorá la segunda".
*/

        const [rows] = await connection.query("SELECT * FROM productos");
        res.status(200).json({
            payload: rows
        });
    } catch (error) {
        console.error("Error obteniendo productos: ", error.message);
    }
});


app.get("/api/productos/:id", async (req, res) => {

    const id = req.params.id; // Obtendo el valor que paso por la URL

    const [rows] = await connection.query("SELECT * FROM productos where productos.id = ?", [id]);

    // console.log(rows);

    res.status(200).json({
        payload: rows
    });
});

app.post("/api/productos", async (req,res) => {
    let {id, nombre, imagen, categoria, precio, activo} = req.body;

    let sql_query = "INSERT INTO productos (id, nombre, imagen, categoria, precio, activo) VALUES (?, ?, ?, ?, ?,?)";

    await connection.query(sql_query, [id, nombre, imagen, categoria, precio, 1]);

    res.status(200).json({
        message: "Producto creado con éxito"
    })
});

app.put("/api/productos", async (req,res) => {
    let {id, nombre, imagen, categoria, precio, activo} = req.body;

    let sql_query = `UPDATE productos SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ? WHERE id = ?`;

    await connection.query(sql_query, [nombre, imagen, categoria, precio, activo, id]);

    res.status(200).json({
        message: "Producto actualizado con éxito"
    });
});

app.delete("/api/productos/:id", async (req, res) => {
    let {id} = req.params;

    await connection.query("DELETE FROM productos WHERE id = ?", [id]);

    res.status(200).json({
        message: `Producto con id ${id} eliminado correctamente`
    });
});



app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});