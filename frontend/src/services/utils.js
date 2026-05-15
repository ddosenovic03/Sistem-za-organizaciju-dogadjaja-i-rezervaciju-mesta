export async function handleError(response) {
    if (!response.ok) {
        let message = 'Došlo je do greške.';

        try {
            const errorData = await response.json();
            message = errorData.message || message;
        } catch {
            message = response.statusText || message;
        }

        throw new Error(message);
    }
}