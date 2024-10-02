import React, { useState } from 'react';
import { fetchDONKIData } from '../services/DONKIAPIService';

function DONKI() {
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const result = await fetchDONKIData(type);
        setData(result);
        setLoading(false);
    };

    const formatDataItem = (item) => {
        switch (type) {
            case 'CME':
                return item.activityID ? `CME Date: ${item.activityID}, Speed: ${item.speed}, Type: ${item.cmeAnalyses[0]?.type}` : '';
            case 'FLR':
                return item.activityID ? `FLR Date: ${item.activityID}, Class: ${item.classType}, Peak Time: ${item.peakTime}` : '';
            case 'SEP':
                return item.activityID ? `SEP Date: ${item.activityID}, Location: ${item.location}, In-Situ Measurements: ${item.inSituMeasurements[0]?.parameter}` : '';
            default:
                return JSON.stringify(item);
        }
    };


    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">NASA DONKI Data</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information) API provides access to comprehensive space weather data and notifications, empowering users with insights into solar and geophysical events impacting Earth and space. From solar flares to geomagnetic storms, the DONKI API offers a wealth of information, allowing researchers, educators, and enthusiasts alike to explore and understand the dynamic interactions between the Sun and our planet. With its extensive database and real-time updates, the DONKI API serves as a valuable resource for studying space weather phenomena and their potential impacts on technology, communication systems, and astronaut safety.
                    </p>
                    <div className="form-group">
                        <label htmlFor="typeSelect" className="form-label">Select Information Type:</label>
                        <select id="typeSelect" className="form-select" value={type} onChange={handleTypeChange}>
                            <option value="">Select...</option>
                            <option value="CME">Coronal Mass Ejection (CME)</option>
                            <option value="FLR">Solar Flare (FLR)</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={fetchData} disabled={!type || loading}>
                        {loading ? 'Fetching...' : 'Fetch Data'}
                    </button>
                    {data.length > 0 && (
                        <div className="mt-4">
                            <ul className="list-group">
                                {data.map((item, index) => (
                                    <li key={index} className="list-group-item">{formatDataItem(item)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DONKI;
