import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import { LocationsContext } from "../../services/locations/locationsContext";

export const Search = ({
  onChangeSearch,
}: {
  onChangeSearch: (query: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const { search } = useContext(LocationsContext);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
    onChangeSearch(query);
  };

  const onSubmitEditing = () => {
    if (searchQuery) {
      search(searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
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
