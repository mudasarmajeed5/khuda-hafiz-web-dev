'use client'

import {
    Card,
    CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import {
    Search,
    LoaderCircle,
    Wind,
    Building2,
    Sun,
    Moon,
    Globe,
    Thermometer,
    Waves,
    CloudSun,
} from 'lucide-react'

function formatDateTime(timestamp: number): string {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    })
}

const Weather = () => {
    const [edata, setData] = useState<any>(null)
    const [loader, setLoader] = useState(false)
    const [city, setCity] = useState("Lahore")
    const [cityName, setCityName] = useState('')

    const fetchWeather = async () => {
        try {
            setLoader(true)
            const res = await fetch(`/api/weather?city=${cityName}`)
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        const fetchWeather = async () => {
            const res = await fetch(`/api/weather?city=${city}`);
            const data = await res.json();
            setData(data);
        };

        fetchWeather();
    }, [city]);

    useEffect(() => {
        const handleCityChange = (e: CustomEvent) => {
            setCity(e.detail);
        };

        window.addEventListener("weatherCity", handleCityChange as EventListener);
        return () => {
            window.removeEventListener("weatherCity", handleCityChange as EventListener);
        };
    }, []);
    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            {/* Search input */}
            <div className="flex gap-2">
                <Input
                    placeholder="Search Your City"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                />
                <Button onClick={fetchWeather} disabled={loader}>
                    {loader ? (
                        <LoaderCircle className="animate-spin h-4 w-4" />
                    ) : (
                        <><Search className="mr-2 h-4 w-4" />Search</>
                    )}
                </Button>
            </div>

            {loader || !edata ? (
                <Card className="shadow-lg">
                    <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center">
                            <Skeleton className="w-[120px] h-[120px] rounded-full" />
                            <div className="flex flex-col gap-3 mt-4 w-full items-start">
                                <Skeleton className="w-40 h-5" />
                                <Skeleton className="w-40 h-5" />
                                <Skeleton className="w-40 h-7" />
                            </div>
                        </div>

                        <div className="space-y-4 w-full">
                            <Skeleton className="w-48 h-5" />
                            <Skeleton className="w-40 h-5" />
                            <Skeleton className="w-44 h-5" />
                            <Skeleton className="w-56 h-6 rounded-md" />
                            <Skeleton className="w-56 h-6 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="shadow-lg">
                    <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${edata.weather[0].icon}@2x.png`}
                                alt="weather"
                                width={120}
                            />
                            <div className="flex flex-col gap-2 mt-4 text-gray-700 dark:text-gray-200">
                                <div className="flex items-center gap-2">
                                    <CloudSun className="text-yellow-500 w-5 h-5" />
                                    Condition: <span className="font-semibold">{edata.weather[0].main}</span>
                                </div>
                                {edata.main.sea_level && (
                                    <div className="flex items-center gap-2">
                                        <Waves className="text-blue-500 w-5 h-5" />
                                        Sea Level: <span className="font-semibold">{edata.main.sea_level} hPa</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Thermometer className="text-red-500 w-5 h-5" />
                                    Temperature: <span className="font-bold text-lg">{edata.main.temp}°C</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-800 text-base dark:text-gray-200">
                            <div className="flex items-center gap-2">
                                <Wind className="w-5 h-5" />
                                Wind: {edata.wind.speed} m/s
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                City: {edata.name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Country: {edata.sys.country}
                            </div>
                            <div className="flex dark:text-black items-center gap-2 bg-green-100 px-3 py-1 rounded-md">
                                <Sun className="w-5 h-5 text-yellow-500" />
                                Sunrise: {formatDateTime(edata.sys.sunrise * 1000)}
                            </div>
                            <div className="flex dark:text-black items-center gap-2 bg-emerald-100 px-3 py-1 rounded-md">
                                <Moon className="w-5 h-5 text-blue-700" />
                                Sunset: {formatDateTime(edata.sys.sunset * 1000)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default Weather
