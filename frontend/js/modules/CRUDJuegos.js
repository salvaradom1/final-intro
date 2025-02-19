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
                                <li class="list-group-item">Modo de Juego: ${juego.modo_de_juego.nombre}</li>
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
                                <button class="btn btn-light ms-3" type="button">
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

