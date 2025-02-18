document.addEventListener("DOMContentLoaded", getDataDlcs);

function getDataDlcs () {
    fetch('http://localhost:3000/api/v1/dlcs')
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
};
