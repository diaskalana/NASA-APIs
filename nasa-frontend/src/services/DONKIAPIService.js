const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export async function fetchDONKIData(type) {
    const baseUrl = 'https://api.nasa.gov/DONKI/';
    const url = `${baseUrl}${type}?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch DONKI data for type: ${type}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching DONKI data for type: ${type}`, error);
        return null;
    }
}
