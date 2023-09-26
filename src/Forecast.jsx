
import { DateTime } from "luxon";

function Forecast({date,weather,icon,maxTemp,minTemp}){

   
  
   const time=date.split(" ")[1];
   time.split(":");
    const hour= time[0]+time[1];
    const newTime=hour>12?`${hour-12} PM`:hour==="00"?"12 AM":`${hour[1]} AM`;


   

    const url=`http://openweathermap.org/img/wn/${icon}.png`;
    return (
        <div className="forecast-details">
                <h1 className="time-interval">{newTime}</h1>
               <h1 className="forecast-weather">{weather}</h1>
               <br/>
               <img src={url} alt="weather-icon"/>
                <br/>
                <h1 className="forecast-temp">{Math.floor(maxTemp-273.15)}° </h1>
                <br/>
                    <h1 className="forecast-temp">{Math.floor(minTemp-273.15)}°</h1>
        </div>
    );

}




export default Forecast;


