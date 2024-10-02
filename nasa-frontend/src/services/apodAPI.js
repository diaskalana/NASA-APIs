const API_KEY = process.env.REACT_APP_NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

async function fetchAPOD(date) {
    const url = `${BASE_URL}?api_key=${API_KEY}&date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Astronomy Picture of the Day:', error);
        return null;
    }
}

export { fetchAPOD };
