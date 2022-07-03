import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import { RestaurantsContext } from "../../../services/restaurants/restaurantsContext";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { Search } from "../../../shared/components/Search";

export const RestaurantsScreen = () => {
  const {
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
    restaurants,
  } = useContext(RestaurantsContext);

  const [query, setQuery] = useState<string>("");

  if (restaurantsError) {
    console.error(restaurantsError);
  }

  const getFilteredRestaurants = () => {
    const regex = new RegExp(query, "i");

    return restaurants.filter(({ name }) => !query || name.match(regex));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Search onChangeSearch={setQuery} />
      {restaurants.length ? (
        <RestaurantInfo restaurants={getFilteredRestaurants()} />
      ) : isRestaurantsLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={styles.helpText}>
          <Text>
            {isRestaurantsLoading ? "Loading..." : "Oops something went wrong"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.secondary,
    flex: 1,
  },
  helpText: {
    padding: theme.Spacing.lg,
    alignContent: "center",
  },
  loader: {
    flex: 0.5,
    justifyContent: "center",
    alignContent: "center",
  },
});
