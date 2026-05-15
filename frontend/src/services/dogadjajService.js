import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/dogadjaji';

export async function getDogadjaji() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createDogadjaj(dogadjaj) {
    const response = await fetch(API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj)});
    await handleError(response);
    return response.json();
}

export async function updateDogadjaj(id, dogadjaj) {
    const response = await fetch(`${API_URL}/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dogadjaj)});
    await handleError(response);
    return response.json();
}

export async function deleteDogadjaj(id) {
    const response = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
    await handleError(response);
}
