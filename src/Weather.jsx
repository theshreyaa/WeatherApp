import { DateTime } from "luxon";

function Weather(props) {

    const celsius = Math.floor(props.temp - 273.15);
    

    return (
        <>
        <div className="weather-section">
                <h1 className="temp">{celsius}°C</h1>
                <h1 className="city">{props.city}, {props.country}</h1>
                <div className="sub-section">
                <h2 className="weather">{props.weather}</h2>
                <img className="weather-icon" src={`https://openweathermap.org/img/w/${props.icon}.png`} alt="weather-icon"/>
                </div>
                 <h2 className="date">{DateTime.now().toFormat('cccc, dd LLL')}</h2>
                
                </div>
                </>
        
    );
}

export default Weather;