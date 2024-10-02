export async function fetchImagesAndVideos(query) {
    const baseUrl = 'https://images-api.nasa.gov/search';
    const url = `${baseUrl}?q=${query}&media_type=image,video`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch images and videos');
        }
        const data = await response.json();
        return data.collection.items;
    } catch (error) {
        console.error('Error fetching images and videos:', error);
        return [];
    }
}
