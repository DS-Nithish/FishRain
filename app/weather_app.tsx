import { Alert, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Index = () => {
  const [weatherData, setWeatherData] = useState<any>(null); // Placeholder state for fetched data
  
  const weather = async () => {
    const city = "London";
    const apiKey = "c0afa49be55736e8565cf95b90e2767b";
    const url = `https://pro.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data); // Store the data in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Trigger the weather function when the component mounts
  useEffect(() => {
    weather();
  }, []);

  return (
    <ScrollView contentContainerClassName="h-full">
      <ImageBackground source={require("../assets/images/sky.jpg")} resizeMode="cover" className="h-full">
        <View className="items-center justify-center">
          <Text className="text-cyan-50">Welcome to the weather App</Text>
        </View>
        <View className="flex flex-col mx-3">
          <TouchableOpacity className="flex flex-row justify-between rounded-full bg-blue-400 py-3 pl-3 my-3">
            <View className="flex flex-row gap-3 items-center justify-center">
              <Ionicons name="settings" size={17} />
              <Text>eee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className={"bg-blue-400 py-3 pl-3 my-3 rounded-2xl"}>
            <View className={"flex flex-col"}>
              <Text>Weather: {weatherData?.weather?.[0]?.description || "Loading..."}</Text>
              <Text>Temperature: {weatherData?.main?.temp || "Loading..."}°C</Text>
              <Text>Humidity: {weatherData?.main?.humidity || "Loading..."}%</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className={"bg-blue-400 py-3 pl-3 my-3 px-3 rounded-2xl"}>
            <View className={"gap-3 flex flex-row justify-between content-between py-1"}>
              <MaterialCommunityIcons name="weather-sunset-up" size={20} />
              <MaterialCommunityIcons name="weather-sunset-down" size={20} />
            </View>
            <Text>-----------------o-------------------------------</Text>
            <View className={"gap-3 flex flex-row justify-between pt-3"}>
              <Text>{weatherData?.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : "Loading..."}</Text>
              <Text>{weatherData?.sys?.sunset ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : "Loading..."}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default Index;