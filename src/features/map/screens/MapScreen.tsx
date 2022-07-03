import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationsContext } from "../../../services/locations/locationsContext";
import { RestaurantsContext } from "../../../services/restaurants/restaurantsContext";
import { Search } from "../../../shared/components/Search";

export const MapScreen = () => {
  const { restaurants } = useContext(RestaurantsContext);

  const { isLoading, location, search } = useContext(LocationsContext);

  return (
    <>
      <View style={styles.search}>
        <Search onChangeSearch={search} />
      </View>
      <MapView style={styles.map} showsUserLocation={true}>
        {restaurants &&
          restaurants.map(
            (
              {
                geometry: {
                  location: { lat, lng },
                },
              },
              idx
            ) => (
              <Marker
                key={idx}
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
              />
            )
          )}
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    position: "absolute",
    top: 16,
    width: "100%",
    zIndex: 99999,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
