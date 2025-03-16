import {SetStateAction, useEffect, useState} from "react";
import {Text, View} from "react-native";


const weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("London");
    const apiKey = 'c0afa49be55736e8565cf95b90e2767b';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://pro.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                const response = await fetch(url);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.log("Error Fetching Data", error);
            }
        };
    }, [city, apiKey]);
    const hanleCityChange = (event:any) => {
        setCity(event.target.value);
    };
    if (!weatherData){
        return <View>Loading..</View>;
    }
    return (
        <View>
            <Text>Weather in {city}</Text>
            <Text>{weatherData.main.temp}</Text>
        </View>
    )
}
export default weather;