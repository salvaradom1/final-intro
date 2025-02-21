const API_URL = "http://localhost:3000/api/v1";

export async function getData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) throw new Error(`Error al obtener ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al cargar en ${endpoint}:`, error);
    }
}


export async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Error al enviar datos a ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al subir en ${endpoint}:`, error);
    }
}


export async function putData(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Error al actualizar ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al editar en ${endpoint}:`, error);
    }
}

export async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`Error al eliminar ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(`Error al eliiminar en ${endpoint}:`, error);
    }
}
