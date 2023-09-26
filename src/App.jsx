
import { useEffect,useState } from "react";
import "./styles.css";
import axios from "axios";
import Weather from "./Weather";
import Forecast from "./Forecast";
import SunriseSunset from "./SunriseSunset";
import * as Unicons from '@iconscout/react-unicons';
import AQI from "./AQI";

//0ead1437d0683ecfc51a745ff6d62409
function App() {  
  const[weatherData,setWeatherData]=useState({
    cityName:"",
    weather:"",
    temp:0,
    country:"",
    icon:"",
    maxTemp:0,
    minTemp:0,
    humidity:0,
    pressure:0,
    visibility:0,
    wind:0,
    sunrise:0,
    sunset:0,
    timezone:0,
  });
  
  const [lat,setLat]=useState(0);
  const [lon,setLong]=useState(0);
  const [city,setCity]=useState("");
  const [value,setValue]=useState("");
  const [background, setBackground] = useState("");
  const [forecastData,setForecastData]=useState([])
  const [favouriteList,setFavouriteList]=useState([])
 
  const [aqi,setAqi]=useState({
    aqi:0,
    co:0,
    no:0,
    no2:0,
    o3:0,
    so2:0,
    pm2_5:0,
    pm10:0,
    nh3:0,
  });


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setCity("")
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  const styles={
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100vh',
      overflowX: 'hidden',
      overflowY: 'scroll',
      position: 'relative',
  }

      const searchQuery = ` dark mountain nature scenery landscape`

      const API_URL = `https://api.unsplash.com/search/photos?auto=enhance&fit=crop&w=500&q=60&query=${searchQuery}&client_id=XYEg4zFlcCPrQ6jFuOKaX5qGEJ-SyhLU1aRVs5iRBi4`
  
  function handleSubmit(e){
    e.preventDefault();
    setValue(city);
  }

  


  useEffect(() => {
    
  let n=Math.floor(Math.random()*10);

    axios.get(API_URL)
    .then(response => {
        setBackground(response.data["results"][n]["urls"]["regular"]);
    }).catch(error => {
        console.log(error);
    })

}, []);


useEffect(() => {
axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=0ead1437d0683ecfc51a745ff6d62409`)
.then(response=> {
  setLat(response.data[0].lat);
  setLong(response.data[0].lon);
} ); 
}, [value])

useEffect(() => {
  axios.get( `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=0ead1437d0683ecfc51a745ff6d62409`)
.then(response=> {
  
  
 setWeatherData({
    cityName:response.data.city.name,
    weather:response.data.list[0].weather[0].main,
    temp:response.data.list[0].main.temp,
    country:response.data.city.country,
    icon:response.data.list[0].weather[0].icon,
    maxTemp:response.data.list[0].main.temp_max,
    minTemp:response.data.list[0].main.temp_min,
    humidity:response.data.list[0].main.humidity,
    pressure:response.data.list[0].main.pressure,
    visibility:response.data.list[0].visibility,
    wind:response.data.list[0].wind.speed,
    sunrise:response.data.city.sunrise,
    sunset:response.data.city.sunset,
    timezone:response.data.city.timezone,
   
})

setForecastData(
     response.data.list.map((item)=>{
      return({
      day:item.dt_txt,
      weather:item.weather[0].main,
      icon:item.weather[0].icon,
      maxTemp:item.main.temp_max,
      minTemp:item.main.temp_min, 
     })
    }
))
})

}, [lat,lon])

useEffect(() => {
  axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=0ead1437d0683ecfc51a745ff6d62409`)
  .then(response=>{
    setAqi({
      aqi:response.data.list[0].main.aqi,
      co:response.data.list[0].components.co,
      no:response.data.list[0].components.no,
      no2:response.data.list[0].components.no2,
      o3:response.data.list[0].components.o3,
      so2:response.data.list[0].components.so2,
      pm2_5:response.data.list[0].components.pm2_5,
      pm10:response.data.list[0].components.pm10,
      nh3:response.data.list[0].components.nh3,
    })
  }
  )
}, [lat,lon])


function addToFavourite(){
  if(favouriteList.some((item)=>item.cityName===weatherData.cityName)){
    alert("Already added")
  }

  else{
  setFavouriteList(prev=> [...prev,({
    cityName:weatherData.cityName,
    lon:lon,
    lat:lat,
  })])
 alert("Added to Favourite")
}
}



  return (
      <div style={styles}>
        <div className="container">
        <div className="weather-box">
          <div className="search-box">
        <input className="input-element" name="city" value={city} type="text" placeholder="Enter City Name"  onChange={(e)=> { 
          setCity(e.target.value)
          selectedCity!=="" && setSelectedCity("Favorite")
    }
      }/> 
        <button className="submit" onClick={handleSubmit}>Submit</button>
        <button className="bookmark" onClick={addToFavourite}><Unicons.UilBookmark/></button>
        </div>
        <button className="current-location" onClick={getLocation}>Current Location</button>
        <select className="favourite" onChange={(e)=>{
          setValue(e.target.value)
         setCity("")}}>
             <option value="">Favourite</option>
          {
        favouriteList.map((item,index)=>{
              return(
                <option key={index} value={item.cityName}>{item.cityName}</option>
              )

            })

          }
        </select>
       
        
        <div className="stats">
        <h2 className="pressure">Pressure:{weatherData.pressure} mb</h2>
        <br className="line"/>
        <h2 className="humidity">Humidity: {weatherData.humidity}% </h2>
        <br className="line"/>
        <h2 className="wind">Wind: {weatherData.wind} km/hr</h2>
        <br className="line"/>
        <h2 className="visibility">Visibility: {weatherData.visibility/1000} km</h2>
        <br className="line"/>
        <h2 className="max-temp">MaxTemp: {Math.floor(weatherData.maxTemp - 273.15)}°C</h2>
        <br className="line"/>
        <h2 className="min-temp">MinTemp: {Math.floor(weatherData.minTemp-273.15)}°C</h2>
        </div>
        <AQI
        aqi={aqi.aqi}
        co={aqi.co}
        no={aqi.no}
        no2={aqi.no2}
        o3={aqi.o3}
        so2={aqi.so2}
        pm2_5={aqi.pm2_5}
        pm10={aqi.pm10}
        nh3={aqi.nh3}

        />
        <div className="sub-stats">
       <SunriseSunset
        sunrise={weatherData.sunrise}
        sunset={weatherData.sunset}
        timezone={weatherData.timezone}
        />
        </div>

       <div className="forecast">
        {
          forecastData.map((item,index)=>{
            if(index!==0){
              return(
                <Forecast
                key={index}
                date={item.day}
                weather={item.weather}
                icon={item.icon}
                maxTemp={item.maxTemp}
                minTemp={item.minTemp}
                />
              )
            }
          })
        }
        
        </div>
        </div>
        <Weather 
        city={weatherData.cityName}
        weather={weatherData.weather}
        temp={weatherData.temp}
        country={weatherData.country}
        icon={weatherData.icon}
        timezone={weatherData.timezone}
        />  
        </div>
        </div>
       
    
  )
}

export default App;






