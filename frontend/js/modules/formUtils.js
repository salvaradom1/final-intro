export function limpiarFormulario(formId, buttonId) {
    document.getElementById(buttonId).addEventListener('click', function() {
        document.getElementById(formId).reset();
    });
};

export async function cargarJuegos(dropdownMenuId, dropdownButtonId, searchInputId) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const searchInput = document.getElementById(searchInputId);
    const dropdownButton = document.getElementById(dropdownButtonId);

    try {
        const response = await fetch("http://localhost:3000/api/v1/juegos");
        const juegos = await response.json();
        console.log("Juegos cargados:", juegos);

        juegos.forEach(juego => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <label class="dropdown-item">
                    <input type="checkbox" name="juegos" value="${juego.id}"> ${juego.titulo}
                </label>
            `;
            dropdownMenu.appendChild(listItem);
        });

        new bootstrap.Dropdown(dropdownButton);

    } catch (error) {
        console.error("Error al obtener juegos:", error);
    }

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll(".dropdown-item").forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchText) ? "" : "none";
        });
    });

    dropdownMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });
}