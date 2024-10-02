const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

async function fetchMarsRoverPhotos(camera) {
    const url = `${BASE_URL}?sol=1000&camera=${camera}&api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching Mars rover photos:', error);
        return [];
    }
}

export { fetchMarsRoverPhotos };