import { createConsole, createDLC, createGame } from './modules/formScripts.js';
import { limpiarFormulario, cargarOpciones } from './modules/formUtils.js';

if (document.getElementById("ConsoleForm")) {
    limpiarFormulario("ConsoleForm", "limpiarForm");
    cargarOpciones("juegos", "dropdownMenuConsole", "dropdownMenuButtonConsole", "searchInputConsole");

    document.getElementById("ConsoleForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (this.checkValidity()) {
            createConsole(); 
        } else {
            alert("Completa todos los campos obligatorios.");
        }
    });
}

if (document.getElementById("juegosForm")) {
    limpiarFormulario("juegosForm", "limpiarJuegosForm");
    cargarOpciones("consolas", "dropdownMenuJuego1", "dropdownMenuButtonJuego1", "searchInputJuego1");

    document.getElementById("juegosForm").addEventListener("submit", function (event) {
        event.preventDefault(); 

        if (this.checkValidity()) {
            createGame(); 
        } else {
            alert("Completa todos los campos obligatorios.");
        }
    });
}

if (document.getElementById("dlcForm")) {
    limpiarFormulario("dlcForm", "limpiarDLCForm");
    cargarOpciones("juegos", "dropdownMenuDLC", "dropdownMenuButtonDLC", "searchInputDLC", true);

    document.getElementById("dlcForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (this.checkValidity()) {
            createDLC();
        } else {
            alert("Completa todos los campos obligatorios.");
        }
    });
}

