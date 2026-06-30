const contenedorProductos = document.getElementById("contenedor-productos");
    const getProductoForm = document.getElementById("getProducto-form");
    const URL_PRODUCTOS = "http://localhost:3000/api/productos";

    function mostrarError(message) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${message}</p>
    `;
}
    
    getProductoForm.addEventListener("submit", async event => {
        event.preventDefault();

        const idProd = event.target.idProd.value.trim();

        if (!idProd) {
            mostrarError("Ingresá un ID valido");
        return;
    }
    
        try {
            let respuesta = await fetch(`${URL_PRODUCTOS}/${idProd}`);
            let data = await respuesta.json();

            if (!respuesta.ok) {
                mostrarError(data.message || data.error);
                return;
            }

            let producto = data.payload[0];

            const htmlProducto = `
                <div class="card-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h4>${producto.nombre}</h4>
                    <p>Id: ${producto.id}</p>
                    <p>Categoria: ${producto.categoria}</p>
                    <p>$${producto.precio}</p>
                </div>
            `;
            
            contenedorProductos.innerHTML = htmlProducto;

        } catch (error) {
            console.error("error al obtener el producto: ", error);
            mostrarError("Error de conexion con el servidor");
        }
    });