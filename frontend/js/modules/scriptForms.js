export function limpiarConsola() {
    document.getElementById('limpiarForm').addEventListener('click', function() {
        document.getElementById('consoleForm').reset();
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const dropdownMenu = document.querySelector(".dropdown-menu"); 
    const searchInput = document.getElementById("searchInput");
    const dropdownButton = document.getElementById("dropdownMenuButton");

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

    dropdownButton.addEventListener("click", function () {
        const isShown = dropdownMenu.classList.contains("show");
        if (!isShown) {
            new bootstrap.Dropdown(dropdownButton).toggle();
        }
    });

    dropdownMenu.addEventListener("click", function (event) {
        event.stopPropagation(); 
    });
});

export function createConsole() {
    const nombre = document.getElementById('name').value; 
    const fecha_lanzamiento = document.getElementById('releaseDate').value; 
    const desarrollador = document.getElementById('developer').value; 
    const almacenamiento = parseFloat(document.getElementById('storage').value); 
    const tipo = document.getElementById('type').value; 
    const listaJuegos = Array.from(document.querySelectorAll("input[name='juegos']:checked"))
    .map(input => parseInt(input.value));

    const consola = {
        nombre,
        fecha_lanzamiento,
        desarrollador,
        almacenamiento,
        tipo,
        juegoIds: listaJuegos
    };

    console.log("Datos de la consola: ", consola);

    fetch('http://localhost:3000/api/v1/consolas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consola)
    }).then(response => {
        if (response.status === 201) {
            alert('Consola agregada exitosamente');
            clearForm();
        } else {
            alert('Hubo un error al agregar la consola');
        }
    });
};
