const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export async function fetchEarthImagery(longitude, latitude, date) {
    const baseUrl = 'https://api.nasa.gov/planetary/earth/imagery';
    const queryParams = `?lon=${longitude}&lat=${latitude}&date=${date}&dim=0.15&api_key=${API_KEY}`;
    const url = baseUrl + queryParams;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Earth imagery');
        }
        const imageData = await response.blob();
        return URL.createObjectURL(imageData);
    } catch (error) {
        console.error('Error fetching Earth imagery:', error);
        return null;
    }
}
