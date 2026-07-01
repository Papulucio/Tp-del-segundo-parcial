        const contenedorProductos = document.getElementById("contenedor-productos");
        const getProductForm = document.getElementById("getProducto-form");
        const URL_PRODUCTOS = "http://localhost:3000/api/productos"

        function mostrarMensaje(type, message) {
            contenedorProductos.innerHTML = `
                <p class="mensaje mensaje-${type}">${message}</p>
            `;
        }

        function mostrarError(message) {
            contenedorProductos.innerHTML = `
                <p class="mensaje mensaje-error">${message}</p>
            `;
        }

        getProductForm.addEventListener("submit", async event => {
            event.preventDefault(); //Evitamos el envio por defecto HTML del formulario

            // Extraemos el id del producto
            const idProd = event.target.idProd.value.trim();

            if (!idProd) {
                mostrarError("Ingresá un ID valido");
                return;
            }
            
            try {
                const response = await fetch(`${URL_PRODUCTOS}/${idProd}`);
                console.log(response);

                const datos = await response.json();
                console.log(datos);

                if (!response.ok) {
                    mostrarMensaje("error", datos.message || datos.error);
                    return
                }
                
                const producto = datos.payload[0];

                console.log(producto); 

                renderizarProducto(producto);

            } catch (error) {
                console.error("Error al obtener el producto");
                mostrarError("error", "Error de conexion con el servidor");
            }
        });

        function renderizarProducto(producto) {
            let htmlProducto = `
            <div class="card-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p>Id: ${producto.id}</p>
                <p>Categoria: ${producto.categoria}</p>
                <p>$${producto.precio}</p>
                <input type="button" id="borrarProducto-boton" value="Eliminar producto">
            </div>
            `;

            contenedorProductos.innerHTML = htmlProducto;

            const deleteProductButton = document.getElementById("borrarProducto-boton");

            deleteProductButton.addEventListener("click", event => {
                event.stopPropagation();

                const confirmacion = confirm("Querés eliminar este producto?");

                if(!confirmacion) {
                    alert("Eliminacion cancelada");
                } else {
                    eliminarProducto(producto.id);
                }
            });
        }

        // Funcion para realizar una operacion delete
        async function eliminarProducto(id) {
            try {
                const response = await fetch(`${URL_PRODUCTOS}/${id}`, {
                    method: "DELETE"
                });

                const result = await response.json();

                if (!response.ok) {
                    console.error(result.message);
                    mostrarMensaje("error", result.message);
                    return;
                }

                mostrarMensaje("exito", result.message);

            } catch (error) {
                console.error("Error en la solicitud DELETE: ", error);
                alert("Ocurrio un error al eliminar un producto");
            }
        }