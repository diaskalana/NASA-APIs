import React, { useState } from 'react';
import { fetchInSightWeatherData } from '../services/InSightAPIService';

function InSight() {
    const [date, setDate] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        const data = await fetchInSightWeatherData(date);
        setWeatherData(data);
        setLoading(false);
    };

    return (
        <div className="container py-5">
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    <h2 className="mb-0">InSight Mars Weather Data</h2>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        The NASA InSight Mars Weather Data API provides access to real-time and historical weather data collected by the InSight lander on the Martian surface. Offering insights into atmospheric conditions such as temperature, wind speed, and atmospheric pressure, this API enables researchers, enthusiasts, and educators to explore and analyze the dynamic weather patterns of Mars. With its comprehensive dataset and easy-to-use interface, the InSight Mars Weather Data API facilitates a deeper understanding of Martian climate dynamics and supports scientific inquiry into the Red Planet's environment. Whether for academic research, educational purposes, or simply curiosity-driven exploration, this API serves as a valuable resource for anyone interested in unraveling the mysteries of Mars' weather.
                    </p>
                    <div className="form-group">
                        <label htmlFor="dateInput" className="form-label">Enter Date:</label>
                        <input
                            type="date"
                            id="dateInput"
                            className="form-control"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={fetchData} disabled={!date || loading}>
                        {loading ? 'Fetching...' : 'Fetch Weather Data'}
                    </button>
                    {weatherData && (
                        <div className="mt-4">
                            <h3 className="mb-3">Weather Data for {date}</h3>
                            <ul className="list-group">
                                {Object.entries(weatherData).map(([sol, data]) => (
                                    <li key={sol} className="list-group-item">
                                        Sol {sol}: {data.AT ? `Temperature: ${data.AT.av}°C` : 'Temperature data not available'}, {data.HWS ? `Wind Speed: ${data.HWS.av} m/s` : 'Wind speed data not available'}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InSight;
