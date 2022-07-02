import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import {
  RestaurantsContext,
  RestaurantsContextProvider,
} from "../../../services/restaurants/restaurantsContext";
import { Restaurant } from "../../../services/types";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { Search } from "../components/Search";

export const RestaurantsScreen = () => {
  const restaurantContext = useContext(RestaurantsContext);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    restaurantContext?.restaurants ?? []
  );

  if (!restaurantContext || restaurantContext?.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (restaurantContext?.error) {
    console.error(restaurantContext);
    return (
      <View>
        <Text>Oops something went wrong</Text>
      </View>
    );
  }

  const filterRestaurants = (query: string) => {
    const regex = new RegExp(query, "i");

    const filtered = restaurantContext.restaurants.filter(
      ({ name }) => !query || name.match(regex)
    );

    setFilteredRestaurants(filtered);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Search onChangeSearch={filterRestaurants} />
      <RestaurantInfo restaurants={filteredRestaurants} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.secondary,
  },
});
