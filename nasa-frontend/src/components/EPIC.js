import React, { useState } from 'react';
import { fetchEPICImages } from '../services/EPICAPI';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function EPIC() {
    const [date, setDate] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchEPICImages(date);
        setImages(data);
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">NASA EPIC Images</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA EPIC API provides access to imagery captured by the Earth Polychromatic Imaging Camera (EPIC) aboard the NOAA's DSCOVR satellite. Offering a unique perspective from a million miles away, this API allows users to retrieve stunning images of our planet, showcasing its dynamic beauty and ever-changing landscapes. From breathtaking views of Earth's sunlit hemisphere to captivating glimpses of atmospheric phenomena like clouds and storms, the EPIC API offers a window into the marvels of our planet as seen from space. Whether for scientific exploration, educational purposes, or simply to marvel at the wonders of our world, the EPIC API offers a rich repository of imagery that inspires and captivates audiences worldwide.
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
                        {loading ? 'Fetching...' : 'Fetch EPIC Images'}
                    </button>
                    {images.length > 0 && (
                        <div className="mt-4">
                            <AwesomeSlider bullets={false}>
                                {images.map((image, index) => (
                                    <div key={index}>
                                        <img src={`https://epic.gsfc.nasa.gov/archive/natural/${date.split('-').join('/')}/png/${image.image}.png`} alt={`EPIC ${index}`} className="img-fluid rounded" style={{ maxHeight: '600px' }} />
                                    </div>
                                ))}
                            </AwesomeSlider>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EPIC;
