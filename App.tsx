import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { List } from "./src/components/List";
import { Search } from "./src/components/Search";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <List />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#aaa",
  },
});
