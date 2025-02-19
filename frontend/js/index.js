import { limpiarConsola } from './modules/scriptForms.js'
import { buscarJuegos } from './modules/scriptForms.js';
import { createConsole } from './modules/scriptForms.js'; 

limpiarConsola();
buscarJuegos();

document.getElementById("submit").addEventListener("click", createConsole);





