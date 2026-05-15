const API_URL = 'http://localhost:8080/api/rezervacije';

export async function getRezervacije() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Greška prilikom učitavanja rezervacija.');
    }

    return response.json();
}

export async function createRezervacija(rezervacija) {
    const response = await fetch(API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(rezervacija)});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja rezervacije.');
    }

    return response.json();
}

export async function otkaziRezervaciju(id) {
    const response = await fetch(`${API_URL}/${id}/otkazi`, {method: 'DELETE'});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom otkazivanja rezervacije.');
    }

    return response.json();
}