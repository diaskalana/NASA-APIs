const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export async function fetchInSightWeatherData(date) {
    const baseUrl = 'https://api.nasa.gov/insight_weather/';
    const url = `${baseUrl}?api_key=${API_KEY}&feedtype=json&ver=1.0`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch InSight weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching InSight weather data:', error);
        return null;
    }
}
