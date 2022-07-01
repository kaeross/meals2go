import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={onChangeSearch} value={searchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
