document.addEventListener("DOMContentLoaded", getDataJuegos);

function getDataJuegos() {
    fetch('http://localhost:3000/api/v1/juegos')
    .then(response => response.json())
    .then(juegos => {
        console.log(juegos);
        let juegosContainer = document.getElementById('juegos-container');
        juegosContainer.innerHTML = '';

        juegos.forEach(juego => {
            let fechaFormateada = new Date(juego.fecha_lanzamiento).toLocaleDateString();
            let card = `
                <div class="col-sm-4 mb-4">
                    <div class="card text-left border-0 shadow rounded-0 p-3" style="max-width: 22rem;">
                        <div class="icon">
                            <svg class="icon bi d-block mx-auto mb-1" width="24" height="24" fill="currentColor">
                                <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#controller"></use>
                            </svg>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title text-center fw-bold text">${juego.titulo}</h4>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Descripcion: ${juego.descripcion}</li>
                                <li class="list-group-item">Modo de Juego: ${juego.modo_de_juego.map(m => m.nombre).join(", ")}</li>
                                <li class="list-group-item">Fecha de lanzamiento: ${fechaFormateada}</li>
                                <li class="list-group-item">Peso: ${juego.peso} GB</li>    
                                <li class="list-group-item">Consolas: 
                                    <button class="btn btn-link-light ver-consolas" data-consolas='${JSON.stringify(juego.consola)}'>Ver compatibles</button>
                                </li>
                                <li class="list-group-item">DLC's: 
                                    <button class="btn btn-link-light ver-dlc" data-dlcs='${JSON.stringify(juego.dlcs)}'>Ver compatibles</button>
                                </li>
                            </ul>
                             <div class="d-flex justify-content-end my-3"> 
                                <button class="btn btn-light ms-3 editGameButton" type="button" data-id="${juego.id}">
                                    <svg class="icon bi" width="16" height="16" fill="currentColor">
                                        <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#pencil-square"></use>
                                    </svg>
                                </button>
                                <button id="deleteButton" class="btn btn-danger ms-3" type="button" data-bs-toggle="modal" data-bs-target="#modalDeleteGame"  data-id="${juego.id}">
                                    <svg class="icon bi" width="16" height="16" fill="currentColor">
                                        <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#trash3"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            juegosContainer.innerHTML += card;
        });
    })
    .catch(error => console.error('Error fetching data:', error));
};

function mostrarConsolas(consolas) {
    let modalConsolasList = document.getElementById('modal-consoles-list');
    
    if (consolas && consolas.length > 0) {
        let listaConsolas = consolas.map(consola => `<li>${consola.nombre}</li>`).join('');
        modalConsolasList.innerHTML = `<ul>${listaConsolas}</ul>`;
    } else {
        modalConsolasList.innerHTML = '<p>No hay consolas compatibles cargadas para este juego aún.</p>';
    }

    let modal = new bootstrap.Modal(document.getElementById('consolesModal'));
    modal.show();
}

function mostrarDLC(dlcs) {
    let modalDlcList = document.getElementById('modal-dlc-list');
    
    if (dlcs && dlcs.length > 0) {
        let listaDlcs = dlcs.map(dlc => `<li>${dlc.titulo}</li>`).join('');
        modalDlcList.innerHTML = `<ul>${listaDlcs}</ul>`;
    } else {
        modalDlcList.innerHTML = '<p>No hay DLC cargados para este juego.</p>';
    }

    let modal = new bootstrap.Modal(document.getElementById('dlcModal'));
    modal.show();
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("ver-consolas")) {
        let consolas = JSON.parse(event.target.getAttribute("data-consolas"));
        mostrarConsolas(consolas);
    } else if (event.target.classList.contains("ver-dlc")) {
        let dlcs = JSON.parse(event.target.getAttribute("data-dlcs"));
        mostrarDLC(dlcs);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const modalDeleteGame = document.getElementById("modalDeleteGame");
    const botonEliminar = document.getElementById("confirmDelete");

    modalDeleteGame.addEventListener("show.bs.modal", function (event) {
        const boton = event.relatedTarget; 
        const gameId = boton.getAttribute("data-id"); 

        if (gameId) {
            botonEliminar.setAttribute("data-id", gameId);
        }
    });

    botonEliminar.addEventListener("click", function () {
        const gameId = botonEliminar.getAttribute("data-id");


        fetch(`http://localhost:3000/api/v1/juegos/${gameId}`, {
            method: "DELETE"
        })
            .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar el juego");
            }
            return response.json();
        })
        .then(() => {
            console.log(`Juego ${gameId} eliminado correctamente`);

            let modalInstance = bootstrap.Modal.getInstance(modalDeleteGame);
            if (modalInstance) {
                modalInstance.hide();
            }

            getDataJuegos();
        })
        .catch(error => console.error("Error eliminando juego:", error));
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", async function (event) {
        const button = event.target.closest(".editGameButton");
        if (button) {
            const gameId = parseInt(button.getAttribute("data-id"));
            console.log("Intentando obtener juego con ID:", gameId);

            try {
                const data = await fetch(`http://localhost:3000/api/v1/juegos/${gameId}`).then(res => res.json());
                console.log("Juego obtenido:", data);

                const dropdownMenu = document.getElementById("dropdownMenuJuegoEdit");
                dropdownMenu.innerHTML = ""; 

                const response = await fetch("http://localhost:3000/api/v1/consolas");
                if (!response.ok) throw new Error("Error al obtener consolas");
                const consolas = await response.json();

                consolas.forEach(consola => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <label class="dropdown-item">
                            <input type="checkbox" value="${consola.id}" class="opcion-checkbox"> ${consola.nombre}
                        </label>
                    `;
                    dropdownMenu.appendChild(listItem);
                });

                document.getElementById("editGameId").value = data.id;
                document.getElementById("editGameTitle").value = data.titulo;
                document.getElementById("editGameDescription").value = data.descripcion;
                document.getElementById("editGameReleaseDate").value = data.fecha_lanzamiento.split('T')[0];
                document.getElementById("editGameSize").value = data.peso;

                const modosCheckboxes = document.querySelectorAll("input[name='modos']");
                modosCheckboxes.forEach(checkbox => {
                    checkbox.checked = data.modo_de_juego.some(m => m.id === parseInt(checkbox.value));
                });

                const modal = new bootstrap.Modal(document.getElementById("modalEditGame"));
                modal.show();
            } catch (error) {
                console.error("Error al obtener el juego:", error);
                alert("Hubo un problema al cargar el juego.");
            }
        }
    });

    document.getElementById("editGameForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const gameId = document.getElementById("editGameId").value;

        const updatedGame = {
            titulo: document.getElementById("editGameTitle").value,
            descripcion: document.getElementById("editGameDescription").value,
            fecha_lanzamiento: document.getElementById("editGameReleaseDate").value,
            peso: document.getElementById("editGameSize").value,
            consolaIds: Array.from(document.querySelectorAll("#dropdownMenuJuegoEdit .opcion-checkbox:checked"))
                .map(input => parseInt(input.value)),
            modoDeJuegoIds: Array.from(document.querySelectorAll("input[name='modos']:checked"))
                .map(input => parseInt(input.value))
        };

        console.log("Enviando actualización para juego con ID:", gameId, updatedGame);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/juegos/${gameId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedGame)
            });

            if (!response.ok) throw new Error(`Error al actualizar el juego con ID ${gameId}`);

            const data = await response.json();
            console.log("Juego actualizado con éxito:", data);
            alert("Juego actualizado correctamente");

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById("modalEditGame"));
            if (modalInstance) modalInstance.hide();

            getDataJuegos();
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
            alert("Hubo un problema al actualizar el juego.");
        }
    });
});