import express from "express";
import connection from "./src/api/database/db.js";
import enviroments from "./src/api/config/enviroments.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { loggerURL, } from "./src/api/middlewares/middlewares.js";
import cors from "cors";
import { __dirname, join } from "./src/api/utils/index.js";


const app = express();
const PORT = enviroments.port;

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));


app.use(cors()); // Middleware basico para permitir todas las solicitudes

// Middleware para parsear JSON en las solcitudes POST y PUT
app.use(express.json()); // sin esto, recibe como undefined

app.use(loggerURL)

app.use(express.static(join(__dirname, "src/public")));




app.get("/", (req, res) => {
    res.send("Hola mundo!");
});

app.use("/api/productos", productRoutes);
app.use("/dashboard", viewRoutes);
app.get("/dashboard", (req, res) => {
    res.render("index")
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});