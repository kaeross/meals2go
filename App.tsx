import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-native-paper";
import { List } from "./src/components/List";
import { Search } from "./src/components/Search";

export default function App() {
  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Search />
        <List />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eee",
  },
});
