document.addEventListener("DOMContentLoaded", getDataConsolas);

function getDataConsolas() {
    fetch('http://localhost:3000/api/v1/dlcs')
        .then(response => response.json())
        .then(dlcs => {
            console.log(dlcs); 
            let dlcsContainer = document.getElementById('dlcscontainer');
            dlcsContainer.innerHTML = '';

            dlcs.forEach(dlc => {
                let card = `
                    <div class="col-sm-4">
                        <div class="card text-left border-0 shadow rounded-0 p-3" style="max-width: 22rem;">
                            <div class="icon">
                                <svg class="icon bi d-block mx-auto mb-1" width="24" height="24" fill="currentColor">
                                    <use xlink:href="node_modules/bootstrap-icons/bootstrap-icons.svg#puzzle"></use>
                                </svg>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-center fw-bold text">${dlc.titulo}</h4>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Juego: ${consola.juego}</li>
                                    <li class="list-group-item">Descripcion: ${consola.descripcion}</li>
                                    <li class="list-group-item">Fecha de lanzamiento: ${consola.fecha_lanzamiento}</p>
                                    <li class="list-group-item">Peso: ${consola.peso}</li>
                
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
                consolasContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function getGamesForConsola(consolaId) {
    return fetch(`http://localhost:3000/api/v1/consolas/${consolaId}/juegos`)
        .then(response => response.json());
}

function mostrarJuegos(consolaId) {
    getGamesForConsola(consolaId).then(games => {
        let gamesList = games.map(game => `<li>${game.nombre}</li>`).join('');
        document.getElementById('modal-games-list').innerHTML = `<ul>${gamesList}</ul>`;
   
        let modal = new bootstrap.Modal(document.getElementById('gamesModal'));
        modal.show();
        }).catch(error => {
        console.error('Error fetching games:', error);
        document.getElementById('modal-games-list').innerHTML = '<p> No hay juegos compatibles cargados para esta consola aún </p>';
        let modal = new bootstrap.Modal(document.getElementById('gamesModal'));
        modal.show();
    });
}