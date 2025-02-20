export function limpiarFormulario(formId, buttonId) {
    document.getElementById(buttonId).addEventListener('click', function() {
        document.getElementById(formId).reset();
    });
};

export async function cargarOpciones(endpoint, dropdownMenuId, dropdownButtonId, searchInputId, seleccionUnica = false) {
    const dropdownMenu = document.getElementById(dropdownMenuId);
    const dropdownButton = document.getElementById(dropdownButtonId);

    try {
        const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`);
        const opciones = await response.json();

        dropdownMenu.innerHTML = `<input type="text" class="form-control mb-2" id="${searchInputId}" placeholder="Buscar...">`;

        const searchInput = document.getElementById(searchInputId); 

        opciones.forEach(opcion => {
            const nombre = opcion.nombre || opcion.titulo;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <label class="dropdown-item">
                    <input type="checkbox" value="${opcion.id}" class="opcion-checkbox"> ${nombre}
                </label>
            `;
            dropdownMenu.appendChild(listItem); 
        });

        if (seleccionUnica) {
            dropdownMenu.addEventListener("change", function (event) {
                if (event.target.classList.contains("opcion-checkbox")) {
                    document.querySelectorAll(`#${dropdownMenuId} .opcion-checkbox`).forEach(checkbox => {
                        if (checkbox !== event.target) {
                            checkbox.checked = false;
                        }
                    });
                }
            });
        }

        searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase();
            document.querySelectorAll(`#${dropdownMenuId} .dropdown-item`).forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchText) ? "" : "none";
            });
        });

        new bootstrap.Dropdown(dropdownButton);
    } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
    }

    dropdownButton.addEventListener("click", function () {
        const isShown = dropdownMenu.classList.contains("show");
        if (!isShown) {
            new bootstrap.Dropdown(dropdownButton).toggle();
        }
    });

    dropdownMenu.addEventListener("click", function (event) {
        event.stopPropagation();
    });
};
