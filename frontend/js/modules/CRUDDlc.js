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
                dlcsContainer.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}
