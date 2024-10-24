
import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import {useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedCity, setSubmittedCity] = useState('Thrissur');
  const city = submittedCity;
  const handleSubmit = (e) => {
      e.preventDefault();
      setSubmittedCity(searchTerm);
  };
  const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [airQualityData, setAirQualityData] = useState(null);
    const getAirQualityCondition = (aqi) => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Bad';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
      };
      const AirDescription = (props) => {
        if (props.airQualityCondition === 'Good') {
            return (
                <div>
                    <p>
                    Air quality is considered good when the AQI is between 0 and 50. In this range, air pollution poses little or no risk to the general population.
                     People can enjoy outdoor activities without concern, and the air is typically clean and healthy.
                     This is the ideal air quality scenario, where all individuals can breathe easily and maintain good health.
                    </p>
                </div>
            )
        }
        if (props.airQualityCondition === 'Moderate') {
            return (
                <div>
                    <p>
                    Air quality falls into the moderate category with an AQI between 51 and 100. While air quality is generally acceptable,
                     there may be some pollutants that can affect a very small number of individuals who are unusually sensitive to air pollution. 
                     Most people will not experience any health effects, but those with respiratory issues or allergies should be cautious and may want to limit prolonged outdoor exertion.
                    </p>
                </div>
            )
        }
        if (props.airQualityCondition === 'Bad') {
            return (
                <div>
                    <p>
                    The air quality today falls into the range of Unhealthy for Sensitive Groups. While most people may not experience any health effects, individuals with pre-existing respiratory or heart conditions, older adults, and children are more likely to feel discomfort. It is advisable for sensitive individuals to limit outdoor activities and avoid prolonged exertion. For everyone else, outdoor exposure can continue, but paying attention to any unusual symptoms is encouraged.
                    </p>
                </div>
            )
        }
        if (props.airQualityCondition === 'Unhealthy') {
            return (
                <div>
                    <p>
                    The air quality has reached the Unhealthy range, which means everyone may begin to experience some health effects.
                     Members of sensitive groups, such as those with respiratory or heart conditions, may experience more serious effects. 
                     It’s best for everyone to limit prolonged outdoor exertion. Activities like running or heavy outdoor work should be postponed, especially if you feel discomfort.
                     Consider spending more time indoors where air quality is better regulated, and take precautions such as using air purifiers if available.
                    </p>
                </div>
            )
        }
        if (props.airQualityCondition === 'Very Unhealthy') {
            return (
                <div>
                    <p>
                    The air quality is now classified as Very Unhealthy, posing significant health risks to the general population. Outdoor activity should be avoided by all, and people with pre-existing health conditions should take extra precautions. You may experience symptoms such as difficulty breathing, coughing, or eye irritation. Consider keeping doors and windows closed, using an air purifier indoors, and wearing a mask if going outside is necessary. It’s important to minimize exposure to polluted air during this period.
                    </p>
                </div>
            )
        }
        if (props.airQualityCondition === 'Hazardous') {
            return (
                <div>
                    <p>
                    The air quality is at a Hazardous level, indicating serious health risks for everyone. All outdoor activities should be avoided. This level of pollution can cause significant health issues even for healthy individuals, and it poses serious dangers to sensitive groups. Immediate steps should be taken to reduce exposure, such as staying indoors, keeping windows and doors closed, and using air filters or purifiers. Follow local health advisories closely, and avoid all outdoor exertion until air quality improves.
                    </p>
                </div>
            )
        }
    }
    useEffect(() => {
        const fetchWeather = async () => {
            const options = {
                method: 'GET',
                url: `https://weatherapi-com.p.rapidapi.com/current.json`,
                params: { q: city },
                headers: {
                    'x-rapidapi-key': '799faed7b4msh4e094a11e606f1cp17f7e5jsn867150e7cb30',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                },
            };

            try {
                const response = await axios.request(options);
                setWeatherData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            }
        };
        const fetchAirQuality = async () => {
            const options = {
              method: 'GET',
              url: 'https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality',
              params: { city: city },
              headers: {
                'x-rapidapi-key': '799faed7b4msh4e094a11e606f1cp17f7e5jsn867150e7cb30',
                'x-rapidapi-host': 'air-quality-by-api-ninjas.p.rapidapi.com',
              },
            };
      
            try {
              const response = await axios.request(options);
              setAirQualityData(response.data);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching air quality data:', error);
              setLoading(false); 
            }
          };
          
          fetchWeather();
          fetchAirQuality();
    }, [city]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!weatherData) {
        return <div>No weather data available</div>;
    }
    const airQualityCondition = getAirQualityCondition(airQualityData?.overall_aqi)  ;
    
    const getBackgroundClass = (airQualityCondition) => {
      if (airQualityCondition === 'Good') {
        return 'bg-green-500'; // Good
      } else if (airQualityCondition === 'Moderate') {
        return 'bg-yellow-500'; // Moderate
      } else if (airQualityCondition === 'Bad') {
        return 'bg-orange-500'; // Unhealthy for Sensitive Groups
      } else if (airQualityCondition === 'Unhealthy') {
        return 'bg-red-500'; // Unhealthy
      } else if (airQualityCondition === 'Very Unhealthy') {
        return 'bg-pink-500'; // Very Unhealthy
      } else {
        return 'bg-gray-800'; // Hazardous
      }
    };
    const BackgroundClass = getBackgroundClass(airQualityCondition);
  return (
    <div className={`mt-0 ${BackgroundClass}`}>
      <div className='w-screen h-screen inset-0 opacity-75 justify-between'>
      <div className='absolute mt-5 justify-between flex flex-wrap' >
        <div>
            <h1 className='text-white font-semibold ml-32 text-2xl'>
                HH Weather
            </h1>
        </div>
      </div>
        <div className='p-24'>
        <div>
            <form onSubmit={handleSubmit} className="flex items-center max-w-lg mx-auto">
                <label htmlFor="city-search" className="sr-only">Search Cities</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <IoIosSearch size={25} className="text-gray-500" />
                    </div>
                    <input
                        type="text"
                        id="city-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                        placeholder="Search Cities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Search</button>
            </form>
            
        </div>
        <div className='flex justify-between place-content-center mt-10'>
            <div className='justify-center place-content-center grid  '> 
                <div className="block p-6 bg-gray-800 border-gray-700 rounded-2xl w-fit">
                    <div className='justify-around flex'>
                        <div className='flex justify-center'>
                            <img src={`https:${weatherData.current.condition.icon}`} alt="Weather icon" className='h-32 w-32' />
                            <div className=''>
                                <h2 className="text-6xl font-bold text-white text-center pt-5 pl-5">{weatherData.current.temp_c}<sup>°</sup>c </h2> 
                                <h6 className="text-xl font-normal text-white text-center ">Feels Like : {weatherData.current.feelslike_c}<sup>°</sup>c</h6>

                            </div>
                        </div>

                        <div className='ml-24 p-4 text-white w-max'>
                            <h1 className='text-2xl font-bold'> {weatherData.location.name} </h1>  
                            <h3>Humidity: {weatherData.current.humidity}</h3>
                            <h3>Wind: {weatherData.current.wind_kph} kph</h3>
                            <h3>Weather: {weatherData.current.condition.text}</h3>
                        {/*    <h3>air Quality : {airQualityData ? airQualityData.overall_aqi : undefined }</h3> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='justify-between place-content-center grid ml-4 '> 
                <div className="block p-6 bg-gray-800 border-gray-700 rounded-2xl w-fit">
                    <div className='justify-between flex'>
                        <div className='flex justify-center'>
                            <img src="/static/air-quality.png" alt="Weather icon" className='h-32 w-32' />
                            <div className=''>
                                <h2 className="text-6xl font-bold text-white text-center pt-5 pl-5">{airQualityData ?airQualityData.overall_aqi : undefined} <span className='text-xl m-0' >aqi</span> </h2> 
                            </div>
                        </div>

                        <div className='ml-24 p-4 text-white w-max'>
                        <h1 className='text-2xl font-bold'> {airQualityData && airQualityCondition ? airQualityCondition : 'N/A' } </h1> 
                        <h3>O<sub>3</sub> : {airQualityData && airQualityData.O3 ? airQualityData.O3.concentration : 'N/A'} µg/m3</h3>
                        <h3>SO<sub>2</sub> : {airQualityData && airQualityData.SO2 ? airQualityData.SO2.concentration : 'N/A'} µg/m3</h3>
                        <h3>CO<sub>2</sub>  : {airQualityData && airQualityData.CO ? airQualityData.CO.concentration : 'N/A'} µg/m3</h3>
                        {/*    <h3>air Quality : {airQualityData ? airQualityData.overall_aqi : undefined }</h3> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div className='justify-center place-content-center grid  mt-10 text-white'> 
                <div className="block p-6 bg-gray-800 border-gray-700 rounded-2xl w-fit">
                     {airQualityData && airQualityCondition ? <AirDescription airQualityCondition={airQualityCondition}/> : <div>No air quality description available</div> } 
                </div>
            </div>
        </div>
       
      </div>
      
    </div>
  );
}

export default App;
