const API_URL = 'http://localhost:8080/api/organizatori';

export async function getOrganizatori() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Greška prilikom dohvaćanja organizatora.');
    }

    return response.json();
}

export async function createOrganizator(organizator) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(organizator) });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja organizatora.');
    }

    return response.json();
}