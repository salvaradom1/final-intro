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

export function createDLC() {
    const titulo = document.getElementById('Title').value;
    const descripcion = document.getElementById('Description').value; 
    const fecha_lanzamiento = document.getElementById('ReleaseDate').value; 
    const peso = document.getElementById('Size').value; 
    const juego = parseInt(document.querySelector("input[name='juegos']:checked")?.value);

    const dlc = {
        juegoId : juego,
        titulo,
        descripcion,
        fecha_lanzamiento,
        peso,
    };

    console.log("Datos del dlc: ", dlc);

    fetch('http://localhost:3000/api/v1/dlcs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dlc)
    }).then(response => {
        if (response.status === 201) {
            alert('DLC agregado exitosamente');
            clearForm();
        } else {
            alert('Hubo un error al agregar el DLC');
        }
    });
};