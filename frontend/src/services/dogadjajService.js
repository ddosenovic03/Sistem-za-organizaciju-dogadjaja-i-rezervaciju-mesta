const API_URL = 'http://localhost:8080/api/dogadjaji';

export async function getDogadjaji() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Greška prilikom dohvaćanja događaja');
    }

    return response.json();
}

export async function createDogadjaj(dogadjaj) {
    const response = await fetch(API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj)});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja događaja.');
    }

    return response.json();
}

export async function updateDogadjaj(id, dogadjaj) {
    const response = await fetch(`${API_URL}/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj)});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom ažuriranja događaja.');
    }

    return response.json();
}

export async function deleteDogadjaj(id) {
    const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom brisanja događaja');
    }
}