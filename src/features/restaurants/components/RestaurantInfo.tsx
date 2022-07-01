import React from "react";

import { StyleSheet, FlatList, View, Text } from "react-native";
import { faker } from "@faker-js/faker";
import { Card, Paragraph, Title } from "react-native-paper";
import { Spacing } from "../../../utils/spacing";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";

type Restaurant = {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
};

type IconName = "restaurant" | "tapas";

const iconType: IconName[] = ["restaurant", "tapas"];

const getRandomIcon = () => {
  return iconType[faker.datatype.number({ min: 0, max: 1 })];
};

const restaurantFactory = ({
  name = faker.random.words(1),
  icon = getRandomIcon(),
  photos = [faker.image.food()],
  address = faker.address.streetAddress(true),
  isOpenNow = true,
  rating = faker.datatype.float({ min: 3, max: 5, precision: 0.1 }),
  isClosedTemporarily = false,
}: Partial<Restaurant> = {}) => ({
  name,
  icon,
  photos,
  address,
  isOpenNow,
  rating,
  isClosedTemporarily,
});

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
    <Card style={styles.card}>
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

const restaurants = new Array(5).fill(null).map(() => restaurantFactory());

export const RestaurantInfo = ({ searchQuery }: { searchQuery?: string }) => {
  const filteredRestaurants = restaurants.filter(
    ({ name, address }) =>
      !searchQuery || name.match(searchQuery) || address.match(searchQuery),
  );

  return filteredRestaurants.length ? (
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
