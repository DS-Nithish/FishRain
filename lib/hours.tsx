import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { weatherImages } from "@/app/weather_app";
import * as Location from "expo-location"

function HourlyWeather() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [location, setLocation] = useState<any>(null)




  const forecast = async () => {
    const lat = location?.coords?.latitude.toFixed(4);
    const lon = location?.coords?.longitude.toFixed(4);
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

  };

  // Trigger the weather function when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status == 'granted') {
        console.log("granted");
      } else {
        console.log("denied");
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    })();
    forecast();
  }, []);



  return (
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
            <Image className="size-11" source={{ uri: 'https:' + forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.condition?.icon }} />
            {/* < Image className="size-11" source={weatherImages[forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.condition?.text]} /> */}

            < Text > {forecastData?.forecast?.forecastday?.[0]?.hour?.[22]?.temp_c.toFixed(0)
            } </Text>
          </View>
        </TouchableOpacity >
      </ScrollView>
    </View >
  );
}

export default HourlyWeather;
