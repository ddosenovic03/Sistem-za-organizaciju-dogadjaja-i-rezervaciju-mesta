import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/rezervacije';

export async function getRezervacije() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createRezervacija(rezervacija) {
    const response = await fetch(API_URL, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(rezervacija)});
    await handleError(response);
    return response.json();
}

export async function otkaziRezervaciju(id) {
    const response = await fetch(`${API_URL}/${id}/otkazi`, {method: 'DELETE'});
    await handleError(response);
    return response.json();
}