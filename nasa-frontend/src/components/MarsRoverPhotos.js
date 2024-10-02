import React, { useState } from 'react';
import { fetchMarsRoverPhotos } from '../services/marsRoverAPI';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import marsPlanetImage from '../assets/mars_planet.jpg';

function MarsRoverPhotos() {
    const [camera, setCamera] = useState('');
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState('');

    const handleCameraChange = (e) => {
        setCamera(e.target.value);
    };

    const fetchData = async () => {
        try {
            const data = await fetchMarsRoverPhotos(camera);
            setPhotos(data);
            setError('');
        } catch (error) {
            setError('Failed to fetch photos. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mars Rover Photos</h2>
            <p>The NASA Mars Rover Photos API provides access to a vast collection of captivating images captured by the rovers exploring the Martian surface. Offering a fascinating glimpse into the Red Planet's terrain and geological features, this API allows users to retrieve high-resolution photographs taken by NASA's various rover missions, including Curiosity, Opportunity, and Perseverance. Whether showcasing panoramic landscapes, intriguing rock formations, or close-up views of Martian soil, the Mars Rover Photos API offers an immersive experience for enthusiasts and researchers alike, fostering a deeper understanding of Mars' environment and the ongoing exploration efforts conducted by NASA.</p>
            <div className="row mb-4">
                <div className="col-md-4">
                    <label htmlFor="cameraSelect" className="form-label">Select Camera:</label>
                    <select id="cameraSelect" value={camera} onChange={handleCameraChange} className="form-select">
                        <option value="" disabled>Select Camera</option>
                        <option value="FHAZ">Front Hazard Avoidance Camera</option>
                        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                        <option value="MAST">Mast Camera</option>
                        <option value="CHEMCAM">Chemistry and Camera Complex</option>
                        <option value="MAHLI">Mars Hand Lens Imager</option>
                        <option value="MARDI">Mars Descent Imager</option>
                        <option value="NAVCAM">Navigation Camera</option>
                        {/* Add more options for other cameras */}
                    </select>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary mt-3" onClick={fetchData}>Fetch Photos</button>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                <div className="col">
                    <AwesomeSlider bullets={false}>
                        {photos.length > 0 ? (
                            photos.map((photo) => (
                                <div key={photo.id}>
                                    <img src={photo.img_src} alt="Mars Rover" className="img-fluid rounded" />
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src={marsPlanetImage} alt="Mars Planet" className="img-fluid rounded" />
                                <p className="mt-3" style={{ color: '#fff', paddingLeft: '10px' }}>No photos available. Please select a camera and click 'Fetch Photos'.</p>
                            </div>
                        )}
                    </AwesomeSlider>
                </div>
            </div >
        </div >
    );
}

export default MarsRoverPhotos;
