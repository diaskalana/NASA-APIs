const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export async function fetchEPICImages(date) {
    const baseUrl = 'https://api.nasa.gov/EPIC/api/natural/date';
    const url = `${baseUrl}/${date}?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch EPIC images');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching EPIC images:', error);
        return null;
    }
}
