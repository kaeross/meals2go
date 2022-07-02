import React from "react";

import { StyleSheet, FlatList, View, Text } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { Restaurant } from "../../../services/types";
import { useRestaurantsQuery } from "../../../hooks/useRestaurantsQuery";

const Rating = ({ rating }: { rating: number }) => {
  const starsCount = Math.round(rating);

  const stars = new Array(starsCount)
    .fill(null)
    .map((_, idx) => <Ionicons key={idx} name="star" size={16} color="gold" />);

  return <Paragraph>{stars}</Paragraph>;
};

const RestaurantCard = ({
  name,
  icon,
  photos,
  address,
  isOpenNow,
  rating,
  isClosedTemporarily,
}: Restaurant) => {
  return (
    <Card style={styles.card} accessible={true}>
      <Card.Cover key={name} source={{ uri: photos[0] }} />
      <Card.Content>
        <Title selectionColor={theme.colors.brand}>
          {name} <MaterialIcons name={icon} size={16} />
        </Title>
        <Rating rating={rating} />
        <Paragraph>{address}</Paragraph>
        <Paragraph>
          {isClosedTemporarily || !isOpenNow ? "Closed" : "Open"}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export const RestaurantInfo = ({ searchQuery }: { searchQuery?: string }) => {
  const { isLoading, data: restaurants } = useRestaurantsQuery();

  // const [filteredRestaurants, setFilteredRestaurants] = useState(
  //   [] as Restaurant[]
  // );

  const filteredRestaurants = restaurants?.filter(
    ({ name, address }) =>
      !searchQuery || name.match(searchQuery) || address.match(searchQuery)
  );

  return !isLoading && filteredRestaurants?.length ? (
    <FlatList
      style={styles.container}
      renderItem={({
        item: {
          name,
          icon,
          photos,
          address,
          isClosedTemporarily,
          isOpenNow,
          rating,
        },
      }: {
        item: Restaurant;
      }) => (
        <RestaurantCard
          name={name}
          icon={icon}
          photos={photos}
          address={address}
          isOpenNow={isOpenNow}
          rating={rating}
          isClosedTemporarily={isClosedTemporarily}
        />
      )}
      data={filteredRestaurants}
    />
  ) : (
    <View>
      <Text>No restaurants found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.Spacing.lg,
    renderItem: "",
  },
  card: {
    marginBottom: theme.Spacing.lg,
  },
});
