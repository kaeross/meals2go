import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

export const Search = ({ onChangeSearch }: { onChangeSearch: (query: string) => void }) => {
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={onChangeSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
