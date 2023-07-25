import { useEffect, useState } from "react";
import clearSky from "./assets/clearSky.jpg";
import Cold from "./assets/Cold.jpg";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city,setCity]=useState("paris");
  const[weather,setWeather]=useState(null);
  const [units,setUnits]=useState("metric");
  const [bg,setBg]=useState(clearSky);
  useEffect(()=>{
   const fetchWeatherData=async()=>{
    const data=await getFormattedWeatherData(city,units);
    setWeather(data);

    //dynamic bg
    const thresold=units==='metric'? 30 : 88;
    if(data.temp<=thresold){
      setBg(Cold);
    }
    else{
      setBg(clearSky);
    }
  };
   fetchWeatherData();
    
  },[units,city]);//parameters effect
  const handleUnitsClick=(e)=>{
      const button =e.currentTarget;
      const currentUnit=button.innerText.slice(1);
      const isCelsius= currentUnit ==="C";
      button.innerText=isCelsius ? "°F" :"°C";
      setUnits(isCelsius ? "metric":"imperial");
  };
  const enterKeyPressed=(e)=>{
   if(e.keyCode===13){
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
   }
  }

  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {weather && 
        <div className="container">
          <div className="section section__inputs">
             <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City name.."/>
             <button onClick={(e)=>handleUnitsClick(e)}>°F</button>
          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img 
              src={weather.iconURL} alt="weatherIcon"/>
              <h3>{weather.description}</h3>
              
            </div>
            <div className="temperature">
                <h1>{`${(weather.temp).toFixed()} ° ${units==='metric'? "C" :"F" } `}</h1>
              </div>
          </div>
          <Descriptions weather={weather} units={units}/>

         { /*bottom description*/}
           

        </div>
}
      </div>
      
    </div>
  );
}

export default App;
