const contenedorProductos = document.getElementById("contenedor-productos");
const postProductoForm = document.getElementById("postProducto-form");
const postUsuarioForm = document.getElementById("postUsuario-form");
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

    postUsuarioForm.addEventListener("submit", async event => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data = Object.fromEntries(formData.entries());
        console.table(data);

        const jsonData = JSON.stringify(data);
        console.log(jsonData);

    try {
        const response = await fetch("http://localhost:3000/api/usuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        console.log(response);
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        // Mostramos el mensaje de exito y reseteamos el form
        const infoUser = `${result.message} con id ${result.userId}`
        mostrarMensaje("exito", infoUser)
        console.log(infoUser);

        event.target.reset();

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
    }

    });

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