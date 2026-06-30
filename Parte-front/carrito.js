const contenedorItems = document.getElementById("pantalla-carrito-items");
const textoTotal = document.getElementById("cart-total-txt");

// 1. LEER DEL LOCALSTORAGE Y DIBUJAR
function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contenedorItems.innerHTML = "";

    if (carrito.length === 0) {
        contenedorItems.innerHTML = `<p style="color: #888; text-align: center; padding: 20px;">Tu pedido está vacío. ¡Anda al catálogo a buscar juegos! 🎮</p>`;
        textoTotal.innerText = "$0";
        return;
    }

    let totalAcumulado = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        const fila = document.createElement("div");
        fila.style.cssText = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #1a1a1e;";

        fila.innerHTML = `
            <div>
                <!-- Acordate que en el paso anterior le pusimos 'nombre' al objeto -->
                <strong style="font-size: 1.1rem; color: #fff;">${item.nombre}</strong>
                <div style="font-size: 0.85rem; color: #aaa;">
                    $${item.precio.toLocaleString("es-AR")} x ${item.cantidad} u.
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #00ff88; font-weight: bold;">$${subtotal.toLocaleString("es-AR")}</span>
                <button onclick="eliminarDelCarrito(${index})" style="background: transparent; border: none; color: #ff4444; cursor: pointer; font-size: 1.1rem;" title="Eliminar ítem">🗑️</button>
            </div>
        `;

        contenedorItems.appendChild(fila);
    });

    textoTotal.innerText = `$${totalAcumulado.toLocaleString("es-AR")}`;
}

// 2. FUNCIÓN PARA BORRAR UN ÍTEM INDIVIDUAL
function eliminarDelCarrito(indice) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(indice, 1); // Cortamos el elemento de ese índice
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(); // Volvemos a dibujar
}

// 3. BOTÓN DE COMPRA FINAL (GENERAR TICKET)
function procesarCompraFinal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("❌ El carrito está vacío. No hay nada que cobrar.");
        return;
    }

    const confirmacion = confirm("¿Confirmas la compra de todos los productos en Gamer Zone?");
    
    if (confirmacion) {
        // Acá podrías hacer un fetch() con método POST a un futuro endpoint /api/ventas
        alert("🔥 ¡COMPRA EXITOSA! Gracias por confiar en Gamer Zone.\n\nTu ticket fue generado y enviado a tu consola.");
        localStorage.removeItem("carrito"); // Vaciamos la memoria
        renderizarCarrito(); // Limpiamos pantalla
    }
}

// Apenas carga el HTML, ejecutamos el dibujado
document.addEventListener("DOMContentLoaded", renderizarCarrito);