import React from "react";
import { DefaultTheme, configureFonts, Provider } from "react-native-paper";
import { colors } from "./src/infrastructure/theme/colors";
import { fontConfig } from "./src/infrastructure/theme/fonts";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Oswald_400Regular } from "@expo-google-fonts/oswald";
import { Lato_400Regular } from "@expo-google-fonts/lato";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./src/features/restaurants/components/Tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurantsContext";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <RestaurantsContextProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </RestaurantsContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}
