import React from "react";
import { DefaultTheme, configureFonts, Provider } from "react-native-paper";
import { RestaurantsScreen } from "./src/features/restaurants/screens/RestaurantsScreen";
import { colors } from "./src/infrastructure/theme/colors";
import { fontConfig } from "./src/infrastructure/theme/fonts";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MapScreen } from "./src/features/restaurants/screens/MapScreen";
import { SettingsScreen } from "./src/features/restaurants/screens/SettingsScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Restaurants"
      component={RestaurantsScreen}
      options={{
        tabBarIcon: () => <MaterialIcons name="restaurant" size={32} />,
      }}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={{
        tabBarIcon: () => <MaterialIcons name="map" size={32} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: () => <MaterialIcons name="settings" size={32} />,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [oswaldLoaded, latoLoaded] = useFonts({
    Oswald_400Regular,
    Lato_400Regular,
  });

  if (!oswaldLoaded && !latoLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <Provider
      theme={{
        ...DefaultTheme,
        roundness: 2,
        colors: {
          ...DefaultTheme.colors,
          ...colors.ui,
        },
        fonts: configureFonts(fontConfig),
      }}
    >
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}
