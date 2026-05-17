import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/organizatori';

export async function getOrganizatori() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createOrganizator(organizator) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(organizator) });
    await handleError(response);
    return response.json();
}

export async function updateOrganizator(id, organizator) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(organizator) });
    await handleError(response);
    return response.json();
}

export async function deleteOrganizator(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await handleError(response);
}