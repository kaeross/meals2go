import { View, Text, StyleSheet } from "react-native";

export const List = () => (
  <View style={styles.container}>
    <Text>List</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flexGrow: 1,
    padding: 16,
  },
});
