document.addEventListener("DOMContentLoaded", () => {
    const ticketDetalle = document.getElementById("ticket-detalle");
    const ticketId = document.getElementById("ticket-id");
    const ticketCliente = document.getElementById("ticket-cliente");
    const ticketFecha = document.getElementById("ticket-fecha"); 

    const ultimoPedido = JSON.parse(localStorage.getItem("ultimo_pedido"));
    const nombreGuardado = localStorage.getItem("cliente_nombre") || "Invitado";

    if (!ultimoPedido || ultimoPedido.items.length === 0) {
        ticketDetalle.innerHTML = "<p style='text-align:center;'>No se encontró ningún ticket reciente.</p>";
        return;
    }

    ticketCliente.innerText = nombreGuardado;
    ticketId.innerText = `#${String(ultimoPedido.id).padStart(3, '0')}`;

    const hoy = new Date();
    ticketFecha.innerText = `FECHA: ${hoy.toLocaleDateString('es-AR')} - ${hoy.toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'})}`;

    let htmlContenido = "";

    ultimoPedido.items.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        htmlContenido += `
            <div class="ticket-line">
                <span>${item.cantidad}x ${item.producto}</span>
                <span>$${subtotal.toLocaleString('es-AR')}</span>
            </div>
        `;
    });

    htmlContenido += `
        <div class="ticket-line" style="font-weight: bold; margin-top: 15px; font-size: 1.1rem;">
            <span>TOTAL:</span>
            <span>$${ultimoPedido.total.toLocaleString('es-AR')}</span>
        </div>
    `;

    ticketDetalle.innerHTML = htmlContenido;
});

function reiniciarTotem(event) {
    event.preventDefault(); 
    
    localStorage.clear(); 
    
    window.location.href = "index.html";
}