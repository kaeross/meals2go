import { useQuery } from "react-query";
import { locationService } from "../services/locations/locationsService";
import { Geometry } from "../services/types";

export const useLocationsQuery = (locationQuery?: string) => {
  return useQuery<Geometry>(["locations", locationQuery], () =>
    locationService(locationQuery)
      .then(async (geometry) => geometry)
      .catch((e) => {
        throw e;
      })
  );
};
