const API_URL = 'http://localhost:8080/api/lokacije';

export async function getLokacije() {
    const response = await fetch(API_URL);
 
    if (!response.ok) {
        throw new Error('Greška prilikom dohvaćanja lokacija.');
    }
 
    return response.json();
}

export async function createLokacija(lokacija) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lokacija) });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja lokacije.');
    }

    return response.json();
}