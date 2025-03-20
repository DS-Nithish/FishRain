import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css"
import React, { useEffect, useState } from "react";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HourlyWeather from "@/lib/hours";
import weatherImages from "./weather_app";




interface indexProps {
  lat: any;
  lon: any;

}
interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface ForecastData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}





const Index = () => {
  const [weatherData, setWeatherData] = useState<any>(null); // Placeholder state for fetched data
  const [forecastData, setForecastData] = useState<any>(null);
  const [location, setLocation] = useState<any>(false);
  const [loc, setCoords] = useState<any>()


  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Allow location access to fetch weather data.");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    console.log("Fetched Location:", loc.coords); // Debugging log
    setCoords(loc)


  }


  // const lat = 8.7421454;
  // const lon = 78.1487826;
  //

  const weather = async () => {
    let locs = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    console.log("Fetched Location:", locs.coords); // Debugging log


    const lat = locs?.coords?.latitude;
    const lon = locs?.coords?.longitude;
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // if (data.error) {
      //   console.error("Weather API Error:", data.error.message);
      //   Alert.alert("Error", "Weather data not found for this location.");
      //   return;
      // }
      setWeatherData(data); // Store the data in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      Alert.alert("Error", "Failed to fetch weather data.");
    }

  };


  const forecast = async () => {
    let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    console.log("Fetched Location:", loc.coords); // Debugging log


    const lat = loc?.coords?.latitude;
    const lon = loc?.coords?.longitude;
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7&aqi=no`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setForecastData(data); // Store the data in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    console.log(url);
    console.log(lat);
  };

  // Trigger the weather function when the component mounts
  useEffect(() => {
    weather();
    forecast()
  }, []);

  const newDate = forecastData?.forecast?.forecastday?.[0]?.date;
  const dates = new Date(newDate).toDateString();
  console.log(dates);
  const month = dates.slice(4, 7);
  const day = dates.slice(0, 3);




  return (
    <View className="flex-1">
      <Image source={require("../assets/images/sky.jpg")} className="h-full w-full absolute" blurRadius={70} />
      <ScrollView overScrollMode="always" horizontal={false} showsVerticalScrollIndicator={false} >

        <Text className="justify-center text-white text-2xl ml-4 mb-4 font-semibold">{weatherData?.location?.name}</Text>

        < View className="items-center justify-center">
          <Image source={weatherImages[weatherData?.current?.condition?.text]} className="size-52" />
          <Text className="text-white text-6xl  pt-3 drop-shadow-2xl">{weatherData?.current?.temp_c.toFixed(0)}°</Text>
          <Text className="text-white mr-6">{weatherData?.current?.condition?.text.toUpperCase()}</Text>
        </View>

        <View className="flex flex-col mx-3">
          <View className=" flex flex-row bg-white opacity-50 rounded-full items-center justify-between  py-3 pl-3 my-3">
            <TouchableOpacity className="items-start w-full">
              <View className="flex flex-row gap-3 items-center justify-center">
                <Ionicons name="settings" size={17} />
                <Text>Low Pollen Count</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* nnnnn */}


          < View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 pl-3 my-3" >
            <ScrollView horizontal={true}>
              <Hourly time={0} icon={0} temp={0} />
              <Hourly time={2} icon={2} temp={2} />
              <Hourly time={4} icon={4} temp={4} />
              <Hourly time={6} icon={6} temp={6} />
              <Hourly time={8} icon={8} temp={8} />
              <Hourly time={10} icon={10} temp={10} />
              <Hourly time={12} icon={12} temp={12} />
              <Hourly time={14} icon={14} temp={14} />
              <Hourly time={16} icon={16} temp={16} />
              <Hourly time={18} icon={18} temp={18} />
              <Hourly time={20} icon={20} temp={20} />
              <Hourly time={22} icon={22} temp={22} />

            </ScrollView>
          </View >


          {/* iiiii */}
          <View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 px-3 my-3">
            <TouchableOpacity className={" w-full"}>
              <View className={"gap-3 flex flex-row justify-between content-between py-1"}>
                <MaterialCommunityIcons name="weather-sunset-up" size={30} />
                <MaterialCommunityIcons name="weather-sunset-down" size={30} />
              </View>
              <Text>-----------------o-------------------------------</Text>
              <View className={"gap-3 flex flex-row justify-between pt-3"}>
                <Text>{forecastData?.forecast?.forecastday?.[0]?.astro?.sunrise || "Loading..."}</Text>
                <Text>{forecastData?.forecast?.forecastday?.[0]?.astro?.sunset || "Loading..."}</Text>
              </View>
            </TouchableOpacity>
          </View>


          <View className=" flex flex-col  bg-white opacity-50 rounded-2xl items-center justify-between  py-3 px-3 my-3">
            <Days date={0} icon={0} temp={0} />
            <Days date={1} icon={1} temp={1} />
            <Days date={2} icon={2} temp={2} />
            <Days date={3} icon={3} temp={3} />
            <Days date={4} icon={4} temp={4} />
            <Days date={5} icon={5} temp={5} />
            <Days date={6} icon={6} temp={6} />



          </View>
        </View>

        <View className="flex flex-row mb-2  mr-6 gap-2 ml-3 justify-between items-center">
          <View className=" items-start gap-2 rounded-2xl w-1/3 h-full bg-white opacity-50 py-2 px-4 flex flex-col ">
            <MaterialIcons name="sunny" size={30} />
            <Text>UV</Text>
            <Text>{weatherData?.current?.uv.toFixed(0)}</Text>
          </View>
          <View className="rounded-2xl gap-2 w-1/3 h-full bg-white opacity-50 py-2 px-4">
            <FontAwesome6 name="temperature-half" size={30} />
            <Text>Feels like</Text>
            <Text>{weatherData?.current?.feelslike_c.toFixed(0)}</Text>

          </View>
          <View className="rounded-2xl gap-2 w-1/3 h-full  bg-white opacity-50 py-2 px-4">
            <MaterialCommunityIcons name="water-alert" size={30} />

            <Text>Humidity</Text>
            <Text>{weatherData?.current?.humidity}</Text>

          </View>

        </View>
        <View className="flex flex-row mb-20  mr-6 gap-2 ml-3 justify-between items-center">
          <View className=" rounded-2xl gap-2 w-1/3 h-full bg-white opacity-50 py-2 px-4">
            <MaterialCommunityIcons name="weather-windy" size={30} />

            <Text>{weatherData?.current?.wind_dir} wind</Text>
            <Text>{weatherData?.current?.wind_mph.toFixed(0)}</Text>
          </View>
          <View className="rounded-2xl gap-2 w-1/3 h-full bg-white opacity-50 py-2 px-4">
            <MaterialIcons name="wind-power" size={30} />
            <Text>Air Pressure</Text>
            <Text>{weatherData?.current?.pressure_mb.toFixed(0)} hPa</Text>

          </View>
          <View className="rounded-2xl w-1/3 h-full gap-2  bg-white opacity-50 py-2 px-4">
            <MaterialCommunityIcons name="eye" size={30} />
            <Text>Visibility</Text>
            <Text>{weatherData?.current?.vis_km.toFixed(0)} km</Text>

          </View>

        </View>


      </ScrollView>
    </View>
  );


function Hourly({ time, icon ,temp}: { time: number, icon: number ,temp:number}) {

 const hourTime = forecastData?.forecast?.forecastday?.[0]?.hour?.[time]?.time.slice(10, 16)
  return (
    < TouchableOpacity >
      <View className={"flex flex-col justify-between gap-3 items-center"}>
        <Text>{hourTime} </Text>

        < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[icon]?.condition?.text]} />

        < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[temp]?.temp_c.toFixed(0)} </Text>
      </View>
    </TouchableOpacity >
  )

}
function Days({date,icon,temp}:{date:number,icon:number,temp:number}) {
  
  const newDate = forecastData?.forecast?.forecastday?.[date]?.date;
  const dates = new Date(newDate).toDateString();
 
  const month = dates.slice(4, 7);
  const day = dates.slice(0, 3);

  return(
  <TouchableOpacity className="w-full" >
  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
    <Text >{forecastData?.forecast?.forecastday?.[date]?.date.slice(8, 10) || "Loading..."}</Text>
    <Text>{month}</Text>
    <Text>{day}</Text>
    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[icon]?.day?.condition?.text]} />
    <Text >{forecastData?.forecast?.forecastday?.[temp]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[temp]?.day.mintemp_c.toFixed(0)}</Text>
  </View>
</TouchableOpacity>
)

}

};
export default Index;
