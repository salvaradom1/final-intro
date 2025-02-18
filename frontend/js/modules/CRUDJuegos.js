document.addEventListener("DOMContentLoaded", getDataJuegos);

function getDataJuegos() {
    fetch('http://localhost:3000/api/v1/juegos')
    .then(response => response.json())
    .then(juegos => {
        console.log(juegos);
        let juegosContainer = document.getElementById('juegos-container');
        juegosContainer.innerHTML = '';

        juegos.forEach(juego => {
            let card = `
                <div class="col-sm-4">
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
                                <li class="list-group-item">Modo de Juego: ${juego.modoDeJuegoId}</li>
                                <li class="list-group-item">Fecha de lanzamiento: ${juego.fecha_lanzamiento}</li>
                                <li class="list-group-item">Peso: ${juego.peso}</li>
                                <li class="list-group-item">Consolas: 
                                    <button class="btn btn-link-light" onclick="mostrarJuegos(${juego.consola})">Ver compatibles</button>
                                </li>
                                <li class="list-group-item">DLC's: 
                                    <button class="btn btn-link-light" onclick="mostrarJuegos(${juego.dlc})">Ver compatibles</button>
                                </li>
                            </ul>
                             <div class="d-flex justify-content-start my-3"> 
                                <button class="btn btn-light ms-3" type="button">
                                    <svg class="icon bi" width="16" height="16" fill="currentColor">
                                        <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#pencil-square"></use>
                                    </svg>
                                </button>
                                <button class="btn btn-danger ms-3" type="button">
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
