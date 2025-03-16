import {  Alert,ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css"
import React, {useEffect, useState} from "react";
import { Ionicons , MaterialCommunityIcons} from '@expo/vector-icons'
import * as Location from "expo-location";
import {SafeAreaProvider} from "react-native-safe-area-context";


const Index = () => {
  const [weatherData, setWeatherData] = useState<any>(null); // Placeholder state for fetched data
  const [forecastData,setForecastData] = useState<any>(null);
  const weather = async () => {
    const city = "Chennai";
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
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
    const city = "Chennai";
    const apiKey = "3f54bb226e104ca9829110050251603";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}`;
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

  return (
      <SafeAreaProvider>
        <SafeAreaView className={"flex-1"}>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true} contentContainerClassName={"flex-grow"} horizontal={false} keyboardShouldPersistTaps={"handled"}>
        <ImageBackground source={require("../assets/images/sky.jpg")} resizeMode="cover" className="flex-1">
          <View className="items-center justify-center flex flex-1">
            <Text className="text-white text-8xl  pt-1 drop-shadow-2xl">{weatherData?.current?.temp_c.toFixed(0)}°</Text>
            <Text className="text-white mr-6">{weatherData?.current?.condition?.text.toUpperCase()}</Text>
          </View>


          <View className="flex flex-col mx-3 flex-1">
            <View className=" flex flex-row bg-white opacity-50 rounded-full items-center justify-between  py-3 pl-3 my-3">
            <TouchableOpacity className="items-start w-full">
              <View className="flex flex-row gap-3 items-center justify-center">
                <Ionicons name="settings" size={17} />
                <Text>eee</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 pl-3 my-3">

            <TouchableOpacity >
              <View className={"flex flex-col justify-between gap-3 items-center"}>
                <Text >{ forecastData?.location?.localtime.slice(11,16) || "Loading..."}</Text>
                <Text >{forecastData?.current?.condition?.icon || "Loading..."}</Text>
                <Text >{forecastData?.current?.temp_c.toFixed(0) || "Loading..."}</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 px-3 my-3">

            <TouchableOpacity className={" w-full"}>
              <View className={"gap-3 flex flex-row justify-between content-between py-1"}>
                <MaterialCommunityIcons name="weather-sunset-up" size={20} />
                <MaterialCommunityIcons name="weather-sunset-down" size={20} />
              </View>
              <Text>-----------------o-------------------------------</Text>
              <View className={"gap-3 flex flex-row justify-between pt-3"}>
                <Text>{forecastData?.forecast?.forecastday?.[0]?.astro?.sunrise|| "Loading..."}</Text>
                <Text>{forecastData?.forecast?.forecastday?.[0]?.astro?.sunset|| "Loading..."}</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 pl-3 my-3">

              <TouchableOpacity >
                <View className={"flex flex-row  gap-1.5 items-center"}>
                  <Text >{ forecastData?.forecast?.forecastday?.[0]?.date.slice(8,10) || "Loading..."}</Text>
                  <Text>{"month"}</Text>
                  <Text>{"day"}</Text>
                  <Text >{forecastData?.forecast?.forecastday?.[0]?.day?.condition?.icon || "Loading..."}</Text>
                  <Text >{forecastData?.forecast?.forecastday?.[0]?.day.maxtemp_c.toFixed(0)}</Text>
                  <Text>/</Text>
                  <Text >{forecastData?.forecast?.forecastday?.[0]?.day.mintemp_c.toFixed(0)}</Text>

                </View>
              </TouchableOpacity>`
            </View>
          </View>

        </ImageBackground>
      </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
  );
};

export default Index;