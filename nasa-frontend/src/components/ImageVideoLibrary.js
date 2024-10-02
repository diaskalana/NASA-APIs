import React, { useState } from 'react';
import { fetchImagesAndVideos } from '../services/NASAImageVideoLibraryAPI';

function ImageVideoLibrary() {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchImagesAndVideos(query);
        setItems(data);
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">NASA Image and Video Library</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA Image and Video Library API provides a comprehensive collection of stunning images and captivating videos captured by various NASA missions and telescopes, showcasing the awe-inspiring wonders of the cosmos. This API offers developers access to a vast repository of high-quality multimedia content, including breathtaking views of distant galaxies, mesmerizing footage of celestial phenomena, and close-up snapshots of planets, moons, and asteroids within our solar system. With its rich and diverse content, the NASA Image and Video Library API serves as an invaluable resource for websites seeking to immerse audiences in the beauty and intrigue of space exploration, inspiring curiosity and wonder about the universe beyond our planet.
                    </p>
                    <div className="form-group">
                        <label htmlFor="queryInput" className="form-label">Search Images and Videos:</label>
                        <input
                            type="text"
                            id="queryInput"
                            className="form-control"
                            value={query}
                            onChange={handleQueryChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
                        {loading ? 'Fetching...' : 'Search'}
                    </button>
                    {items.length > 0 && (
                        <div className="mt-4">
                            {items.map((item, index) => (
                                <div key={index} className="mb-3">
                                    {item.data[0].media_type === 'image' ? (
                                        <img src={item.links[0].href} alt={item.data[0].title} className="img-fluid rounded mr-2" style={{ maxHeight: '200px' }} />
                                    ) : (
                                        <video controls className="rounded mr-2" style={{ maxHeight: '200px' }}>
                                            <source src={item.links[0].href} type={item.data[0].media_type === 'video' ? 'video/mp4' : 'application/octet-stream'} />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <p>{item.data[0].title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageVideoLibrary;
