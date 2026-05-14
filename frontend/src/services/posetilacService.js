const API_URL = 'http://localhost:8080/api/posetioci';

export async function getPosetioci() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Greška prilikom dohvaćanja posetilaca.');
    }

    return response.json();
}

export async function createPosetilac(posetilac) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(posetilac) });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Greška prilikom kreiranja posetioca.');
    }

    return response.json();
}