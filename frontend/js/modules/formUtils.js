export function limpiarFormulario(formId, buttonId) {
    document.getElementById(buttonId).addEventListener('click', function() {
        document.getElementById(formId).reset();
    });
};

export async function cargarJuegos(dropdownMenuId, dropdownButtonId, searchInputId, seleccionUnica = false) {
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
                    <input type="checkbox" name="juegos" value="${juego.id}" class="juego-checkbox"> ${juego.titulo}
                </label>
            `;
            dropdownMenu.appendChild(listItem);
        });

        if (seleccionUnica) {
            dropdownMenu.addEventListener("change", function (event) {
                if (event.target.classList.contains("juego-checkbox")) {
                    document.querySelectorAll(`#${dropdownMenuId} .juego-checkbox`).forEach(checkbox => {
                        if (checkbox !== event.target) {
                            checkbox.checked = false;
                        }
                    });
                }
            });
        }

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

    dropdownButton.addEventListener("click", function () {
        const isShown = dropdownMenu.classList.contains("show");
        if (!isShown) {
            new bootstrap.Dropdown(dropdownButton).toggle();
        }
    });

    dropdownMenu.addEventListener("click", function (event) {
        event.stopPropagation(); 
    });
}