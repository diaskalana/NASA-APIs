import React, { useState } from 'react';
import { fetchEarthImagery } from '../services/earthImageryAPI';

function EarthImagery() {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [date, setDate] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const imageUrl = await fetchEarthImagery(longitude, latitude, date);
        setImageSrc(imageUrl);
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">NASA Earth Imagery</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA Earth Imagery API offers a fascinating glimpse into our planet's dynamic landscapes through a vast collection of satellite imagery captured from space. With this API, users can access high-resolution images of Earth's surface, providing valuable insights into environmental changes, natural phenomena, and human impact on the planet. Whether exploring remote wilderness areas, monitoring urban development, or studying the effects of climate change, the NASA Earth Imagery API serves as a powerful tool for researchers, educators, and curious minds alike to better understand and appreciate the beauty and complexity of our home planet from a unique perspective in space.
                    </p>
                    <div className="form-group">
                        <label htmlFor="longitudeInput" className="form-label">Longitude:</label>
                        <input
                            type="number"
                            id="longitudeInput"
                            className="form-control"
                            value={longitude}
                            onChange={handleLongitudeChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitudeInput" className="form-label">Latitude:</label>
                        <input
                            type="number"
                            id="latitudeInput"
                            className="form-control"
                            value={latitude}
                            onChange={handleLatitudeChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateInput" className="form-label">Select Date:</label>
                        <input
                            type="date"
                            id="dateInput"
                            className="form-control"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
                        {loading ? 'Fetching...' : 'Fetch Earth Imagery'}
                    </button>
                    {imageSrc && (
                        <div className="mt-4">
                            <img src={imageSrc} alt="Earth Imagery" className="img-fluid rounded" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EarthImagery;
