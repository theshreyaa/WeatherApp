
import { DateTime, FixedOffsetZone } from 'luxon';
import * as Unicons from "@iconscout/react-unicons"


function SunriseSunset(props)
{
    const zone = FixedOffsetZone.instance(props.timezone/60);
    
    const sunriseTime= DateTime.fromSeconds(props.sunrise).setZone(zone).toFormat('hh:mm a');
    
    
    const sunsetTime = DateTime.fromSeconds(props.sunset).setZone(zone).toFormat('hh:mm a');
    
    return (
        <div className="sunrise-sunset">
            <div className="sunrise">
                <h2 className="sunrise-icon"><Unicons.UilSun color="yellow"size="40px"/></h2>
                <p>Sunrise: {sunriseTime}</p>
            </div>
            <div className="sunset">
                <h2 className='sunset-icon'><Unicons.UilMoon size="40px"/></h2>
                <p> Sunset: {sunsetTime}</p>
            </div>
        </div>
    );
}

export default SunriseSunset;


