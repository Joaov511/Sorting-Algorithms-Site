export async function fetchJSON(filepath) {
    const response = await fetch(filepath);
    const data = await response.json();
    return data;
}