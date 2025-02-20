import { createConsole } from './modules/formScripts.js';
import { limpiarFormulario } from './modules/formUtils.js';
import { cargarJuegos } from './modules/formUtils.js';

if (document.getElementById("consoleForm")) {
    limpiarFormulario("consoleForm", "limpiarForm");
    cargarJuegos("dropdownMenuConsole", "dropdownMenuButtonConsole", "searchInputConsole");

    document.getElementById("submit-consola").addEventListener("click", createConsole);
}
