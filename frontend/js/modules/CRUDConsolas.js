document.addEventListener("DOMContentLoaded", getDataConsolas);

function getDataConsolas() {
    fetch('http://localhost:3000/api/v1/consolas')
        .then(response => response.json())
        .then(consolas => {
            console.log(consolas); 
            let consolasContainer = document.getElementById('consolas-container');
            consolasContainer.innerHTML = '';

            consolas.forEach(consola => {
                let fechaFormateada = new Date(consola.fecha_lanzamiento).toLocaleDateString();
                let card = `
                    <div class="col-sm-4 mb-4">
                        <div class="card text-left border-0 shadow rounded-0 p-3" style="max-width: 22rem;">
                            <div class="icon">
                                <svg class="icon bi d-block mx-auto mb-1" width="24" height="24" fill="currentColor">
                                    <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#display"></use>
                                </svg>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-center fw-bold text">${consola.nombre}</h4>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Fecha de lanzamiento: ${fechaFormateada}</li>
                                    <li class="list-group-item">Desarrollador: ${consola.desarrollador}</li>
                                    <li class="list-group-item">Almacenamiento: ${consola.almacenamiento} GB</li>
                                    <li class="list-group-item">Tipo: ${consola.tipo}</li>
                                    <li class="list-group-item">Juegos: 
                                        <button class="btn btn-link-light ver-juegos" data-juegos='${JSON.stringify(consola.juego)}'>Ver compatibles</button>
                                    </li>
                                </ul>
                                <div class="d-flex justify-content-end my-3"> 
                                        <button class="btn btn-light ms-3 editConsoleButton" type="button" data-id="${consola.id}">
                                            <svg class="icon bi" width="16" height="16" fill="currentColor">
                                                <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#pencil-square"></use>
                                            </svg>
                                        </button>
                                        <button id="deleteButton" class="btn btn-danger ms-3" type="button" data-bs-toggle="modal" data-bs-target="#modalDeleteConsole"  data-id="${consola.id}">
                                            <svg class="icon bi" width="16" height="16" fill="currentColor">
                                                <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#trash3"></use>
                                            </svg>
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                consolasContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


function mostrarJuegos(juegos) {
    let modalGamesList= document.getElementById('modal-games-list');
    
    if (juegos && juegos.length > 0) {
        let listaJuegos = juegos.map(juego => `<li>${juego.titulo}</li>`).join('');
        modalGamesList.innerHTML = `<ul>${listaJuegos}</ul>`;
    } else {
        modalGamesList.innerHTML = '<p>No hay juegos cargados para esta consola aún.</p>';
    }

    let modal = new bootstrap.Modal(document.getElementById('gamesModal'));
    modal.show();
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("ver-juegos")) {
        let juegos = JSON.parse(event.target.getAttribute("data-juegos"));
        mostrarJuegos(juegos);  
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const modalDeleteConsole = document.getElementById("modalDeleteConsole");
    const botonEliminar = document.getElementById("confirmDelete");

    modalDeleteConsole.addEventListener("show.bs.modal", function (event) {
        const boton = event.relatedTarget; 
        const consoleId = boton.getAttribute("data-id"); 

        if (consoleId) {
            botonEliminar.setAttribute("data-id", consoleId);
        }
    });

    botonEliminar.addEventListener("click", function () {
        const consoleId = botonEliminar.getAttribute("data-id");


        fetch(`http://localhost:3000/api/v1/consolas/${consoleId}`, {
            method: "DELETE"
        })
            .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar la consola");
            }
            return response.json();
        })
        .then(() => {
            console.log(`Consola ${consoleId} eliminada correctamente`);

            let modalInstance = bootstrap.Modal.getInstance(modalDeleteConsole);
            if (modalInstance) {
                modalInstance.hide();
            }

            getDataConsolas();
        })
        .catch(error => console.error("Error eliminando consola:", error));
    });
});


///

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", async function (event) {
        const button = event.target.closest(".editConsoleButton");
        if (button) {
            const consoleId = parseInt(button.getAttribute("data-id"));
            console.log("Intentando obtener consola con ID:", consoleId);

            try {
                const data = await fetch(`http://localhost:3000/api/v1/consolas/${consoleId}`).then(res => res.json());
                console.log("Consola obtenida:", data);

                const dropdownMenu = document.getElementById("dropdownMenuConsoleEdit");
                dropdownMenu.innerHTML = ""; 

                const response = await fetch("http://localhost:3000/api/v1/juegos");
                if (!response.ok) throw new Error("Error al obtener juegos");
                const juegos = await response.json();

                juegos.forEach(juego => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <label class="dropdown-item">
                            <input type="checkbox" value="${juego.id}" class="opcion-checkbox"> ${juego.titulo}
                        </label>
                    `;
                    dropdownMenu.appendChild(listItem);
                });


                document.getElementById("editConsoleId").value = data.id;
                document.getElementById("editConsoleName").value = data.nombre;
                document.getElementById("editConsoleReleaseDate").value = data.fecha_lanzamiento.split('T')[0];
                document.getElementById("editConsoleDeveloper").value = data.desarrollador;
                document.getElementById("editConsoleStorage").value = data.almacenamiento;
                document.getElementById("editConsoleType").value = data.tipo;

                const modal = new bootstrap.Modal(document.getElementById("modalEditConsole"));
                modal.show();
            } catch (error) {
                console.error("Error al obtener la consola:", error);
                alert("Hubo un problema al cargar la consola.");
            }
        }
    });

    document.getElementById("editConsoleForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const consoleId = document.getElementById("editConsoleId").value;

        const updatedConsole = {
            nombre: document.getElementById("editConsoleName").value,
            fecha_lanzamiento: document.getElementById("editConsoleReleaseDate").value,
            desarrollador: document.getElementById("editConsoleDeveloper").value,
            almacenamiento: document.getElementById("editConsoleStorage").value,
            tipo: document.getElementById("editConsoleType").value,
            juegoIds: Array.from(document.querySelectorAll("#dropdownMenuConsoleEdit .opcion-checkbox:checked"))
                .map(input => parseInt(input.value))
        };

        console.log("Enviando actualización para consola con ID:", consoleId, updatedConsole);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/consolas/${consoleId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedConsole)
            });

            if (!response.ok) throw new Error(`Error al actualizar la consola con ID ${consoleId}`);

            const data = await response.json();
            console.log("Consola actualizada con éxito:", data);
            alert("Consola actualizada correctamente");

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById("modalEditConsole"));
            if (modalInstance) modalInstance.hide();

            getDataConsolas();
        } catch (error) {
            console.error("Error al actualizar la consola:", error);
            alert("Hubo un problema al actualizar la consola.");
        }
    });
});
