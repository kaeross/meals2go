import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { restaurantService } from "../../../services/restaurants/restaurantsService";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { Search } from "../components/Search";

export const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  restaurantService().then(console.log);

  return (
    <SafeAreaView style={styles.container}>
      <Search onChangeSearch={onChangeSearch} />
      <RestaurantInfo searchQuery={searchQuery} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.secondary,
  },
});
