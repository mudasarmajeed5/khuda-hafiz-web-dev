"use client"
import { FaWind, FaSearch, FaSpinner, FaCity, FaTemperatureHigh, FaSun, FaMoon, FaGlobe, FaWater, FaCloudSun } from "react-icons/fa"
import { formatDateTime } from "../todo/helpers/formatDate"
import { useState } from "react"
const Weather = () => {
  const [edata, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [cityName, setCityName] = useState('');
  const fetchWeather = async () => {
    try {
      setLoader(true);
      const res = await fetch(`/api/weather?city=${cityName}`);
      const data = await res.json();
      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoader(false);
    }
  }

  return (
    <>

      <div className="w-4/5 mx-auto mt-4 ">
        <div className="flex my-5 justify-center gap-2">
          <input className="border w-3/5 px-2 py-1 rounded-md" type="text" name="city-name" placeholder="Search Your City" value={cityName} onChange={(e) => setCityName(e.target.value)} />
          <button className="flex text-white rounded-md bg-blue-600 hover:bg-blue-800 cursor-pointer transition-colors px-2 py-1 text-sm gap-2 items-center" onClick={() => fetchWeather(cityName)}>
            <span>Search</span>
            {
              loader ? <span className="animate-spin"><FaSpinner /></span> : <span><FaSearch /></span>
            }
          </button>
        </div>
        <hr />
        {!edata &&
          <div className="w-4/5 my-4 mx-auto font-semibold text-center animate-pulse text-xl">
            No Data available search for a city
          </div>
        }
        {
          edata &&
          <>
            <div className="flex justify-around">
              <div className="flex flex-col">
                <img src={`https://openweathermap.org/img/wn/${edata?.weather[0]?.icon}@2x.png`} width={150} alt="" />

                <div className="flex flex-wrap items-center gap-6 p-4 bg-blue-50 rounded-xl shadow-sm">

                  <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                    <FaCloudSun className="text-yellow-500" />
                    <span>Condition: <span className="font-semibold">{edata?.weather?.[0]?.main}</span></span>
                  </div>

                  {edata?.main?.sea_level && (
                    <div className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <FaWater className="text-blue-500" />
                      <span>Sea Level: <span className="font-semibold">{edata.main.sea_level} hPa</span></span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                    <FaTemperatureHigh className="text-red-500" />
                    <span>{edata?.main?.temp}°C</span>
                  </div>
                </div>

              </div>
              <div className="flex justify-center items-center w-1/2 mt-10">
                <div className="flex flex-col gap-4 text-base font-semibold p-4">

                  <div className="flex items-center gap-2">
                    <FaWind />
                    <span className="text-lg">{edata?.wind?.speed} m/s</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCity />
                    <span className="text-lg">{edata?.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaTemperatureHigh />
                    <span className="text-lg">{edata?.main?.temp}°C</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaGlobe />
                    <span className="text-lg">{edata?.sys?.country}</span>
                  </div>

                  <div className="flex bg-emerald-600 rounded-md px-2 py-1 items-center gap-2">
                    <FaSun />
                    <span className="text-lg">
                      Sunrise: {edata?.sys?.sunrise ? formatDateTime(edata.sys.sunrise * 1000) : "--"}
                    </span>
                  </div>

                  <div className="flex bg-emerald-600 rounded-md px-2 py-1 items-center gap-2">
                    <FaMoon />
                    <span className="text-lg">
                      Sunset: {edata?.sys?.sunset ? formatDateTime(edata.sys.sunset * 1000) : "--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Weather