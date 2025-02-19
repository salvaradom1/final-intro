export function limpiarConsola() {
    document.getElementById('limpiarForm').addEventListener('click', function() {
        document.getElementById('consoleForm').reset();
    });
}

export function buscarJuegos() {
    document.addEventListener("DOMContentLoaded", function () {

        configurarDropdown("dropdownMenuButton", "searchInput", ".dropdown-menu-modos");

        configurarDropdown("dropdownMenuButtonConsolas", "searchInputConsolas", ".dropdown-menu-consolas");

        configurarDropdown("dropdownMenuButtonDLC", "searchInputDLC", ".dropdown-menu-dlc");
    });
}

function configurarDropdown(botonId, inputBusquedaId, dropdownSelector) {
    const dropdownButton = document.getElementById(botonId);
    const checkboxes = document.querySelectorAll(`${dropdownSelector} input[type='checkbox']`);
    const searchInput = document.getElementById(inputBusquedaId);

    function updateButtonText() {
        const selected = [...checkboxes].filter(ch => ch.checked).map(ch => ch.value);
        dropdownButton.textContent = selected.length ? selected.join(", ") : "Seleccionar";
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateButtonText);
    });

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const filter = this.value.toLowerCase();
            document.querySelectorAll(`${dropdownSelector} li`).forEach(li => {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
}
