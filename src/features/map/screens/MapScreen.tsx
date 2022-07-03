import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationsContext } from "../../../services/locations/locationsContext";
import { RestaurantsContext } from "../../../services/restaurants/restaurantsContext";
import { GeoLocation, Geometry } from "../../../services/types";
import { Search } from "../../../shared/components/Search";

export const MapScreen = () => {
  const [latitudeDelta, setLatitudeDelta] = useState(0);
  const [longitudeDelta, setLongitudeDelta] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { restaurants } = useContext(RestaurantsContext);

  const { location, viewport, search } = useContext(LocationsContext);

  const setDeltas = (vp: Geometry["viewport"]) => {
    const {
      northeast: { lat: northeastLat, lng: northeastLng },
      southwest: { lat: southwestLat, lng: southwestLng },
    } = vp;

    setLatitudeDelta(northeastLat - southwestLat);
    setLongitudeDelta(northeastLng - southwestLng);
  };

  const setLatLng = (loc: GeoLocation) => {
    const { lat, lng } = loc;
    setLatitude(lat);
    setLongitude(lng);
  };

  useEffect(() => {
    if (!viewport || !location) {
      return;
    }
    setDeltas(viewport);
    setLatLng(location);
  }, [location, viewport]);

  return (
    <>
      <View style={styles.search}>
        <Search onChangeSearch={search} />
      </View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitudeDelta,
          longitudeDelta,
          latitude,
          longitude,
        }}
      >
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
