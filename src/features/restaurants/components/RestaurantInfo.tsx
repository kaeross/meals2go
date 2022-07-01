import React from "react";

import { StyleSheet, FlatList, View, Text } from "react-native";
import { faker } from "@faker-js/faker";
import { Button, Card, Paragraph, Title } from "react-native-paper";

type Restaurant = {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
};

const restaurantFactory = ({
  name = faker.random.words(2),
  icon = "food",
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
        <Title>{name}</Title>
        <Paragraph>{address}</Paragraph>
        <Paragraph>
          {isClosedTemporarily || !isOpenNow ? "Closed" : "Open"}
        </Paragraph>
        <Paragraph>{rating}</Paragraph>
        <Button icon={icon} />
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
    padding: 16,
    renderItem: "",
  },
  card: {
    marginBottom: 16,
  },
});
