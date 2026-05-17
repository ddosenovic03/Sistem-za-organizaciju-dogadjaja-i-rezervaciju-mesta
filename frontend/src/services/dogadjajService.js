import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/dogadjaji';

export async function getDogadjaji() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createDogadjaj(dogadjaj) {
    const response = await fetch(API_URL, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj) });
    await handleError(response);
    return response.json();
}

export async function updateDogadjaj(id, dogadjaj) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj) });
    await handleError(response);
    return response.json();
}

export async function deleteDogadjaj(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await handleError(response);
}

export async function pretraziDogadjaje(filteri) {
    const params = new URLSearchParams();

    if (filteri.naziv) params.append('naziv', filteri.naziv);
    if (filteri.grad) params.append('grad', filteri.grad);  
    if (filteri.datum) params.append('datum', filteri.datum);
    if (filteri.status) params.append('status', filteri.status);

    const response = await fetch(`${API_URL}/pretraga?${params.toString()}`);
    await handleError(response);
    return response.json();
}

export async function getNajpopularnijiDogadjaji() {
    const response = await fetch(`${API_URL}/najpopularniji`);
    await handleError(response);
    return response.json();
}
