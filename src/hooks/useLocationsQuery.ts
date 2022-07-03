import { useQuery } from "react-query";
import { locationService } from "../services/locations/locationsService";
import { GeoLocation } from "../services/types";

export const useLocationsQuery = (locationQuery?: string) => {
  return useQuery<GeoLocation>(["locations", locationQuery], () =>
    locationService(locationQuery)
      .then(async (geolocation) => geolocation)
      .catch((e) => {
        throw e;
      })
  );
};
