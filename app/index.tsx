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
                <Text>eee</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* nnnnn */}


          < View className=" flex flex-row bg-white opacity-50 rounded-2xl items-center justify-between  py-3 pl-3 my-3" >
            <ScrollView horizontal={true}>
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[0]?.time.slice(10, 16)} </Text>

                  <Image className="size-11" resizeMode="contain" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[0]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[0]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 2 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[2]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[2]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[2]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 4 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[4]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[4]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[4]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 6 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[6]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[6]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[6]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 8 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[8]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[8]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[8]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 10 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[10]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[10]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[10]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[12]?.time.slice(10, 16)} </Text>

                  <Image className="size-11" resizeMode="contain" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[12]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[12]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 2 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[14]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[14]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[14]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 4 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[16]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[16]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[16]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 6 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[18]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[18]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[18]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 8 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[20]?.time.slice(10, 16)} </Text>

                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[20]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[20]?.temp_c.toFixed(0)} </Text>
                </View>
              </TouchableOpacity >
              {/* 10 */}
              < TouchableOpacity >
                <View className={"flex flex-col justify-between gap-3 items-center"}>
                  <Text>{forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.time.slice(10, 16)} </Text>
                  {/* <Image className="size-11" source={{ uri: 'https:' + forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.condition?.icon }} /> */}
                  < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.condition?.text]} />

                  < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.temp_c.toFixed(0)
                  } </Text>
                </View>
              </TouchableOpacity >
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
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[0]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[0]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[0]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[1]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[1]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[1]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[1]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[2]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[2]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[2]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[2]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[3]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[3]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[3]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[3]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[4]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[4]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[4]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[4]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[5]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[5]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[5]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[5]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" >
              <View className={"flex flex-row  gap-1.5  items-center justify-between"}>
                <Text >{forecastData?.forecast?.forecastday?.[0]?.date.slice(8, 10) || "Loading..."}</Text>
                <Text>{month}</Text>
                <Text>{day}</Text>
                <Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.day?.condition?.text]} />
                <Text >{forecastData?.forecast?.forecastday?.[0]?.day.maxtemp_c.toFixed(0)}{" / "}{forecastData?.forecast?.forecastday?.[0]?.day.mintemp_c.toFixed(0)}</Text>
              </View>
            </TouchableOpacity>



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
};

export default Index;
