document.addEventListener("DOMContentLoaded", getDataConsolas);

export function getDataConsolas () {
    fetch('http://localhost:3000/api/v1/consolas')
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
};
