document.addEventListener("DOMContentLoaded", getDataJuegos);

function getDataJuegos() {
    fetch('http://localhost:3000/api/v1/juegos')
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
};
