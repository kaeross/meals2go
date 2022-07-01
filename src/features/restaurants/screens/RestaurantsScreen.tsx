import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-native-paper";
import { RestaurantInfo } from "../components/RestaurantInfo";
import { Search } from "../components/Search";

export const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Search onChangeSearch={onChangeSearch} />
        <RestaurantInfo searchQuery={searchQuery} />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "#2e2e2e",
  },
});
