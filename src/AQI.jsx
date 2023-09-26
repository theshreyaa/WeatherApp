

function AQI(props) {

   const styles={
    width:"fit-content",
    height:"35px",
    borderRadius:"5px",
    textAlign:"center",
    paddingTop:"4px",
    paddingBottom:"4px",
    paddingLeft:"10px",
    paddingRight:"10px",
    
    position:"absolute",
    top:"21px",
    right:"30px",
    fontSize:"25px",
        backgroundColor:props.aqi>=0 && props.aqi<=3?"green":props.aqi>=4 && props.aqi<=6?"yellow":props.aqi>=7 && props.aqi<=9?"orange":props.aqi>=10?"red":"white"
   }   
     

    return (
        <div className="aqi">
            <h1 className="aqi-title">Air Quality Index (AQI)
            <p style={styles}>
                {
                    props.aqi>=0 && props.aqi<=3?"Good":props.aqi>=4 && props.aqi<=6?"Moderate":props.aqi>=7 && props.aqi<=9?"Unhealthy":props.aqi>=10?"Very Unhealthy":""
                }
            </p>
            </h1>
            
            <div className="aqi-stats">
                <div className="aqi-stat">  
                    <h3>CO</h3>
                    <p>{props.co}</p>
                    </div>
            
                <div className="aqi-stat">
                    <h3>NO2</h3>
                    <p>{props.no2}</p>
                    </div>
                <div className="aqi-stat">
                    <h3>O3</h3>
                    <p>{props.o3}</p>
                    </div>
                <div className="aqi-stat">
                    <h3>SO2</h3>
                    <p>{props.so2}</p>
                    </div>
                <div className="aqi-stat">
                    <h3>PM2.5</h3>
                    <p>{props.pm2_5}</p>
                    </div>
                <div className="aqi-stat">
                    <h3>PM10</h3>
                    <p>{props.pm10}</p>
                    </div>
                <div className="aqi-stat">
                    <h3>NH3</h3>
                    <p>{props.nh3}</p>
                    </div>
                    
        </div>
       
        </div>
    );

}

export default AQI;