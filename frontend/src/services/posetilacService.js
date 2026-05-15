import { handleError } from "./utils";

const API_URL = 'http://localhost:8080/api/posetioci';

export async function getPosetioci() {
    const response = await fetch(API_URL);
    await handleError(response);
    return response.json();
}

export async function createPosetilac(posetilac) {
    const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(posetilac) });
    await handleError(response);
    return response.json();
}