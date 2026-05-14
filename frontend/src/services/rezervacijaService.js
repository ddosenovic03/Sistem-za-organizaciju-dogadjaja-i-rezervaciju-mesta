const API_URL = 'http://localhost:8080/api/rezervacije';

export async function createRezervacija(rezervacija) {
    const response = await fetch(API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(rezervacija)});

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja rezervacije.');
    }

    return response.json();
}