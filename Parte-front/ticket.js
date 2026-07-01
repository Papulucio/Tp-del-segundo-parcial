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

    const btnDescargar = document.getElementById("btn-descargar-pdf");
    if (btnDescargar) {
        btnDescargar.addEventListener("click", () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(22);
            doc.text("GAMER ZONE - TICKET DE COMPRA", 10, 20);
            doc.line(10, 25, 200, 25); 

            doc.setFontSize(14);
            doc.text(`Ticket Nro: #${String(ultimoPedido.id).padStart(3, '0')}`, 10, 40);
            doc.text(`Cliente: ${nombreGuardado}`, 10, 50);
            doc.text(`Fecha: ${fechaTexto}`, 10, 60);
            doc.text("--------------------------------------------------", 10, 70);

            let posY = 80;
            ultimoPedido.items.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                doc.text(`• ${item.producto} (x${item.cantidad}) ---- $${subtotal.toLocaleString('es-AR')}`, 10, posY);
                posY += 10;
            });

            doc.text("--------------------------------------------------", 10, posY);
            posY += 10;
            doc.setFontSize(16);
            doc.text(`TOTAL: $${ultimoPedido.total.toLocaleString('es-AR')}`, 10, posY);

            doc.save(`Ticket_GamerZone_${nombreGuardado}.pdf`);
        });
    }
});

function reiniciarTotem(event) {
    event.preventDefault(); 
    
    localStorage.clear(); 
    
    window.location.href = "index.html";
}