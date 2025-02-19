export function limpiarConsola() {
    document.getElementById('limpiarForm').addEventListener('click', function() {
        document.getElementById('consoleForm').reset();
    });
}

export function buscarJuegos() {
    document.addEventListener("DOMContentLoaded", function () {

        configurarDropdown("dropdownMenuButton", "searchInput", ".dropdown-menu");

        configurarDropdown("dropdownMenuButtonConsolas", "searchInputConsolas", ".dropdown-menu-consolas");

        configurarDropdown("dropdownMenuButtonDLC", "searchInputDLC", ".dropdown-menu-dlc");
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    
    const response = await fetch("http://localhost:3000/api/v1/juegos");
    
    const juegos = await response.json();

    juegos.forEach(juego => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <label class="dropdown-item">
                <input type="checkbox" name="juegos" value="${juego.id}"> ${juego.titulo}
            </label>
        `;
        dropdownMenu.appendChild(listItem);
        });

         searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase();
            document.querySelectorAll(".dropdown-item").forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchText) ? "block" : "none";
            });
        });

});

function configurarDropdown(botonId, inputBusquedaId, dropdownSelector) {
    const dropdownButton = document.getElementById(botonId);
    const checkboxes = document.querySelectorAll(`${dropdownSelector} input[type='checkbox']`);

    function updateButtonText() {
        const selected = [...checkboxes].filter(ch => ch.checked).map(ch => ch.value);
        dropdownButton.textContent = selected.length ? selected.join(", ") : "Seleccionar";
    }

    dropdownMenu.addEventListener("change", function (event) {
        if (event.target.matches("input[type='checkbox']")) {
            updateButtonText();
        }
    });
}


export function createConsole() {
    const nombre = getElementById('name').value;
    const fecha_lanzammiento = getElementById('releaseDate').value;
    const desarrollador = getElementById('developer').value;
    const almacenamiento = parseFloat(getElementById('storage').value);
    const tipo = getElementById('type').value;
} 