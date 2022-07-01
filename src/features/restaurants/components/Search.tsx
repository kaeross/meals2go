import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "../../../infrastructure/theme";

export const Search = ({
  onChangeSearch,
}: {
  onChangeSearch: (query: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search..." onChangeText={onChangeSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.Spacing.md,
    paddingBottom: theme.Spacing.md,
    paddingLeft: theme.Spacing.lg,
    paddingRight: theme.Spacing.lg,
  },
});
