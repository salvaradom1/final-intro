function getDataConsolas () {
    fetch('http://127.0.0.1:3000/api/v1/consolas')
    .then(response => response.json())
    .then(json => {
        console.log(json);
    });
};

