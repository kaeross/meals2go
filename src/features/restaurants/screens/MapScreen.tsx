import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";
import { LocationsContext } from "../../../services/locations/locationsContext";
import { Search } from "../components/Search";

export const MapScreen = () => {
  const { isLoading, location, search } = useContext(LocationsContext);
  return (
    <SafeAreaView style={styles.container}>
      <Search onChangeSearch={search} />
      {location ? (
        <Text>{JSON.stringify(location)}</Text>
      ) : isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={styles.helpText}>
          <Text>Oops something went wrong</Text>
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
