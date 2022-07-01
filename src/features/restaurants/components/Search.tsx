import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Spacing } from "../../../utils/spacing";

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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    paddingLeft: Spacing.lg,
    paddingRight: Spacing.lg,
  },
});
