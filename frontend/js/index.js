import { createConsole } from './modules/formScripts.js';
import { limpiarFormulario } from './modules/formUtils.js';
import { cargarJuegos } from './modules/formUtils.js';
import { createDLC } from './modules/formScripts.js';

if (document.getElementById("consoleForm")) {
    limpiarFormulario("consoleForm", "limpiarForm");
    cargarJuegos("dropdownMenuConsole", "dropdownMenuButtonConsole", "searchInputConsole");

    document.getElementById("submit-consola").addEventListener("click", createConsole);
}

if (document.getElementById("dlcForm")) {
    limpiarFormulario("dlcForm", "limpiarDLCForm");
    cargarJuegos("dropdownMenuDLC", "dropdownMenuButtonDLC", "searchInputDLC", true);

    document.getElementById("submitDLC").addEventListener("click", createDLC);
};