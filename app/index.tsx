import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css"
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HourlyWeather from "@/lib/hours";
import { weatherImages } from "./weather_app";

const Index = () => {
  const [weatherData, setWeatherData] = useState<any>(null); // Placeholder state for fetched data
  const [forecastData, setForecastData] = useState<any>(null);
  const [location, setLocation] = useState<any>({});
 

    useEffect(()=>{
      (async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status == 'granted'){
          console.log("granted");
        } else{
          console.log("denied");
        }
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      
      })();
    },[])

console.log(JSON.stringify(location));

const lat = location?.coords?.latitude.toFixed(4);
const lon = location?.coords?.longitude.toFixed(4);


  const weather = async () => {
  
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data); // Store the data in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const forecast = async () => {
   
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setForecastData(data); // Store the data in state
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
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
 const day = dates.slice(0,3);




  return (
    <View className="flex-1">
      <Image source={require("../assets/images/sky.jpg")} className="h-full w-full absolute" blurRadius={70} />
      <ScrollView overScrollMode="auto" horizontal={false} showsVerticalScrollIndicator={false} >
  


          < View className="items-center justify-center">
          <Text>{weatherData?.location?.name}</Text>
          <Text className="">{weatherData?.location?.region}</Text>
              <Text className="text-white text-8xl  pt-1 drop-shadow-2xl">{weatherData?.current?.temp_c.toFixed(0)}°</Text>
              <Text className="text-white mr-6">{weatherData?.current?.condition?.text.toUpperCase()}</Text>
              <Text>{lat},{lon}</Text>
            </View>
            <View className="flex flex-col mx-3">
              <View className=" flex flex-row bg-white opacity-50 rounded-full items-center justify-between  py-3 pl-3 my-3">
                <TouchableOpacity className="items-start w-full">
                  <View className="flex flex-row gap-3 items-center justify-center">
                    <Ionicons name="settings" size={17} />
                    <Text>eee</Text>
                  </View>
                </TouchableOpacity>
              </View>
           <HourlyWeather />
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
                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[0]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[0]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[0]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[1]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[1]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[1]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[1]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[2]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[2]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[2]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[2]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[3]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[3]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[3]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[3]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[4]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[4]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[4]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[4]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[5]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[5]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[5]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[5]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity className="w-full" >
                  <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                    <Text >{forecastData?.forecast?.forecastday?.[0]?.date.slice(8, 10) || "Loading..."}</Text>
                    <Text>{month}</Text>
                    <Text>{day}</Text>
                    <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.day?.condition?.text]}/>
                    <Text >{forecastData?.forecast?.forecastday?.[0]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[0]?.day.mintemp_c.toFixed(0)}</Text>
                  </View>
                </TouchableOpacity>             
              
              
              
              </View>
            </View>
</ScrollView>
    </View>
  );
};

export default Index;
