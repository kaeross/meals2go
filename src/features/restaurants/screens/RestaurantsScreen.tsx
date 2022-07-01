import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { Search } from "../components/Search";

export const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

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
