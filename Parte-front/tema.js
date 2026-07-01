const temaGuardado = localStorage.getItem("tema-preferido");
if (temaGuardado === "light") {
    document.documentElement.setAttribute("data-theme", "light");
}

document.addEventListener("DOMContentLoaded", () => {
    const botonTema = document.getElementById("theme-toggle");

    if (botonTema) {
        botonTema.innerText = localStorage.getItem("tema-preferido") === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro";

        botonTema.addEventListener("click", () => {
            const esLight = document.documentElement.getAttribute("data-theme") === "light";

            if (esLight) {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("tema-preferido", "dark");
                botonTema.innerText = "☀️ Modo Claro";
            } else {
                document.documentElement.setAttribute("data-theme", "light");
                localStorage.setItem("tema-preferido", "light");
                botonTema.innerText = "🌙 Modo Oscuro";
            }
        });
    }
});