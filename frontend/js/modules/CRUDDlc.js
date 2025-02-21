document.addEventListener("DOMContentLoaded", getDataDlcs);

function getDataDlcs() {
    fetch('http://localhost:3000/api/v1/dlcs')
        .then(response => response.json())
        .then(dlcs => {
            console.log(dlcs); 
            let dlcsContainer = document.getElementById('dlcs-container');
            dlcsContainer.innerHTML = '';

            dlcs.forEach(dlc => {
                let fechaFormateada = new Date(dlc.fecha_lanzamiento).toLocaleDateString();
                
                let card = `
                    <div class="col-sm-4 mb-4">
                        <div class="card text-left border-0 shadow rounded-0 p-3" style="max-width: 22rem;">
                            <div class="icon">
                                <svg class="icon bi d-block mx-auto mb-1" width="24" height="24" fill="currentColor">
                                    <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#puzzle"></use>
                                </svg>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-center fw-bold text">${dlc.titulo}</h4>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Juego: ${dlc.juego.titulo}</li>
                                    <li class="list-group-item">Descripción: ${dlc.descripcion}</li>
                                    <li class="list-group-item">Fecha de lanzamiento: ${fechaFormateada}</li>
                                    <li class="list-group-item">Peso: ${dlc.peso} GB</li>
                                </ul>
                                <div class="d-flex justify-content-start my-3"> 
                                    <button class="btn btn-light ms-3 editDlcButton" type="button" data-id="${dlc.id}">
                                        <svg class="icon bi" width="16" height="16" fill="currentColor">
                                            <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#pencil-square"></use>
                                        </svg>
                                    </button>
                                    <button id="deleteButton" class="btn btn-danger ms-3" type="button" data-bs-toggle="modal" data-bs-target="#modalDeleteDLC"  data-id="${dlc.id}">
                                        <svg class="icon bi" width="16" height="16" fill="currentColor">
                                            <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#trash3"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                dlcsContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    const modalDeleteDLC = document.getElementById("modalDeleteDLC");
    const botonEliminar = document.getElementById("confirmDelete");

    modalDeleteDLC.addEventListener("show.bs.modal", function (event) {
        const boton = event.relatedTarget; 
        const dlcId = boton.getAttribute("data-id"); 

        if (dlcId) {
            botonEliminar.setAttribute("data-id", dlcId);
        }
    });

    botonEliminar.addEventListener("click", function () {
        const dlcId = botonEliminar.getAttribute("data-id");


        fetch(`http://localhost:3000/api/v1/dlcs/${dlcId}`, {
            method: "DELETE"
        })
            .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar DLC");
            }
            return response.json();
        })
        .then(() => {
            console.log(`DLC ${dlcId} eliminado correctamente`);

            let modalInstance = bootstrap.Modal.getInstance(modalDeleteDLC);
            if (modalInstance) {
                modalInstance.hide();
            }

            getDataDlcs();
        })
        .catch(error => console.error("Error eliminando dlc:", error));
    });
});


///

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", async function (event) {
        const button = event.target.closest(".editDlcButton");
        const dlcId = button.getAttribute("data-id");

        console.log("Intentando obtener DLC con ID:", dlcId);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/dlcs/${dlcId}`);
            if (!response.ok) throw new Error("No se pudo obtener el DLC");

            const data = await response.json();
            console.log("DLC obtenido:", data);

            const dropdownMenu = document.getElementById("dropdownMenuEditDlc");
            dropdownMenu.innerHTML = ""; 

            const resJuegos = await fetch("http://localhost:3000/api/v1/juegos");
            if (!resJuegos.ok) throw new Error("Error al obtener juegos");
            const juegos = await resJuegos.json();

            juegos.forEach(juego => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <label class="dropdown-item">
                        <input type="radio" name="dlcJuego" value="${juego.id}" class="opcion-checkbox"> ${juego.titulo}
                    </label>
                `;
                dropdownMenu.appendChild(listItem);
            });

            setTimeout(() => {
                const radioButtons = document.querySelectorAll("#dropdownMenuEditDlc .opcion-checkbox");
                radioButtons.forEach(radio => {
                    radio.checked = (data.juego.id === parseInt(radio.value));
                });
            }, 500);

            document.getElementById("editDLCId").value = data.id;
            document.getElementById("dlcEditTitle").value = data.titulo;
            document.getElementById("dlcEditDescription").value = data.descripcion;
            document.getElementById("dlcEditReleaseDate").value = data.fecha_lanzamiento.split('T')[0];
            document.getElementById("dlcEditSize").value = data.peso;

            const modal = new bootstrap.Modal(document.getElementById("modalEditDLC"));
            modal.show();
        } catch (error) {
            console.error("Error al obtener el DLC:", error);
            alert("Hubo un problema al cargar el DLC.");
        }
    });

    document.getElementById("editDlcForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const dlcId = document.getElementById("editDLCId").value;

        if (!dlcId) {
            console.error("Error: No se encontró el ID del DLC para actualizar.");
            alert("Hubo un problema al actualizar el DLC.");
            return;
        }

        const selectedGame = document.querySelector("input[name='dlcJuego']:checked");
        if (!selectedGame) {
            alert("Debes seleccionar un juego para el DLC.");
            return;
        }

        const updatedDLC = {
            titulo: document.getElementById("dlcEditTitle").value,
            descripcion: document.getElementById("dlcEditDescription").value,
            fecha_lanzamiento: document.getElementById("dlcEditReleaseDate").value,
            peso: document.getElementById("dlcEditSize").value,
            juegoId: parseInt(selectedGame.value)
        };

        console.log("Enviando actualización para DLC con ID:", dlcId, updatedDLC);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/dlcs/${dlcId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedDLC)
            });

            if (!response.ok) throw new Error(`Error al actualizar el DLC con ID ${dlcId}`);

            const data = await response.json();
            console.log("DLC actualizado con éxito:", data);
            alert("DLC actualizado correctamente");

            const modalInstance = bootstrap.Modal.getInstance(document.getElementById("modalEditDLC"));
            if (modalInstance) modalInstance.hide();

            getDataDlcs();
        } catch (error) {
            console.error("Error al actualizar el DLC:", error);
            alert("Hubo un problema al actualizar el DLC.");
        }
    });
});
