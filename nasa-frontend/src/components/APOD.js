import React, { useState } from 'react';
import { fetchAPOD } from '../services/apodAPI';
import placeholderImage from '../assets/placeholder_image.png';

function APOD() {
    const [date, setDate] = useState('');
    const [apod, setAPOD] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchAPOD(date);
        setAPOD(data);
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">Astronomy Picture of the Day</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA Astronomy Photo of the Day (APOD) API offers a captivating glimpse into the cosmos, providing daily access to a stunning array of celestial imagery. This API allows users to explore a vast collection of breathtaking photographs capturing the beauty and wonder of the universe, ranging from mesmerizing nebulae and galaxies to mesmerizing planetary landscapes and astronomical phenomena. With each passing day, users are treated to a new visual delight accompanied by insightful explanations from astronomers, making the APOD API an invaluable resource for both astronomy enthusiasts and curious minds eager to embark on a journey through the cosmos.
                    </p>
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
                        {loading ? 'Fetching...' : 'Fetch APOD'}
                    </button>
                    {apod && (
                        <div className="mt-4">
                            {apod.media_type === 'image' ? (
                                <img src={apod.url} alt={apod.title} className="img-fluid rounded" />
                            ) : (
                                <img src={placeholderImage} alt="Placeholder" className="img-fluid rounded" />
                            )}
                            <h3 className="mt-3">{apod.title}</h3>
                            <p className="mt-2">{apod.explanation}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default APOD;
