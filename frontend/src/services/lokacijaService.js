import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/lokacije';

export async function getLokacije() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createLokacija(lokacija) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lokacija) });
    await handleError(response);
    return response.json();
}