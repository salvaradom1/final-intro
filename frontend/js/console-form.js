export function limpiarConsola () {
    document.getElementById('limpiarForm').addEventListener('click', function() {
        document.getElementById('consoleForm').reset();
    });
};

export function buscarJuegos () {
    document.addEventListener("DOMContentLoaded", function () {
        const dropdownButton = document.getElementById("dropdownMenuButton");
        const checkboxes = document.querySelectorAll(".dropdown-menu input[type='checkbox']");
        const searchInput = document.getElementById("searchInput");
    
        function updateButtonText() {
            const selected = [...checkboxes].filter(ch => ch.checked).map(ch => ch.value);
            dropdownButton.textContent = selected.length ? selected.join(", ") : "Seleccionar juegos";
        }
    
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", updateButtonText);
        });
    
        searchInput.addEventListener("keyup", function () {
            const filter = this.value.toLowerCase();
            document.querySelectorAll(".dropdown-menu li").forEach(li => {
                const text = li.textContent.toLowerCase();
                li.style.display = text.includes(filter) ? "" : "none";
            });
        });
    });
};