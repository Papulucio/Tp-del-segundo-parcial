const contenedorProductos = document.getElementById("contenedor-productos");
        const postProductoForm = document.getElementById("postProducto-form");
        const URL_PRODUCTOS = "http://localhost:3000/api/productos";

    function validarFormulario(data) {
        const errores = [];

        if (!data.nombre || data.nombre.trim().length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
        }

        if (!data.precio || isNaN(data.precio) || Number(data.precio) < 0) {
            errores.push("El precio debe ser un numero mayor a 0");
        }

        if (!data.imagen) {
            errores.push("Debe incluirse una imagen");
        }

        if (!data.categoria) {
            errores.push("Debe seleccionar una categoria");
        }

        return errores;
    }

    // Optimizacion 2: Mostramos el mensaje de exito o error visualmente
    function mostrarMensaje(type, message) {
        contenedorProductos.innerHTML = `
            <p class="mensaje mensaje-${type}">${message}</p>
        `;
    }

    function mostrarListaErrores(array) {
        let htmlErrores = "";
        array.forEach(error => {
            htmlErrores+= `<p class="mensaje mensaje-error">${error}</p>`
        });
        contenedorProductos.innerHTML = htmlErrores;
    }

        postProductoForm.addEventListener("submit", async event => {
            event.preventDefault();

            const formData = new FormData(event.target);

            const data = Object.fromEntries(formData.entries());

            data.precio = Number(data.precio);

            const errores = validarFormulario(data);

            if (errores.length > 0) {
                console.log(errores);
                mostrarListaErrores(errores);
                return;
            }

            try {
                const respuesta = await fetch(URL_PRODUCTOS, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const resultado = await respuesta.json();
            
                if (!respuesta.ok) {
                
                    if (resultado.listaErrores) {
                        mostrarListaErrores(resultado.listaErrores);
                        return;
                    }

                mostrarMensaje("error", resultado.message);
                return;
            }

            // En caso de exito, mostramos los siguientes mensajes
            mostrarMensaje("exito", resultado.message);
            console.log(resultado.message);

        } catch (error) {
            console.error("Error al enviar los datos ", error);
            mostrarMensaje("error", "Error al procesar la solicitud")
        }
    });