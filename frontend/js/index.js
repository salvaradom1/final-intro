import { createConsole, createDLC, createGame } from './modules/formScripts.js';
import { limpiarFormulario, cargarOpciones } from './modules/formUtils.js';

if (document.getElementById("consoleForm")) {
    limpiarFormulario("consoleForm", "limpiarForm");
    cargarOpciones("juegos", "dropdownMenuConsole", "dropdownMenuButtonConsole", "searchInputConsole");

    document.getElementById("submit-consola").addEventListener("click", createConsole);
}

if (document.getElementById("dlcForm")) {
    limpiarFormulario("dlcForm", "limpiarDLCForm");
    cargarOpciones("juegos", "dropdownMenuDLC", "dropdownMenuButtonDLC", "searchInputDLC", true);

    document.getElementById("submitDLC").addEventListener("click", createDLC);
}

if (document.getElementById("juegosForm")) {
    limpiarFormulario("juegosForm", "limpiarJuegosForm");
    cargarOpciones("consolas", "dropdownMenuJuego1", "dropdownMenuButtonJuego1", "searchInputJuego1");

    document.getElementById("submit-juego").addEventListener("click", createGame);
}
