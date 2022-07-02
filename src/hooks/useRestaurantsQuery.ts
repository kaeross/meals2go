import { useQuery } from "react-query";
import { restaurantService } from "../services/restaurants/restaurantsService";
import { Restaurant } from "../services/types";

export const useRestaurantsQuery = (location?: string) => {
  return useQuery<Restaurant[]>(["restaurants", location], () =>
    restaurantService(location)
      .then((restaurants) => {
        console.log(restaurants);
        return restaurants;
      })
      .catch((e) => {
        console.error(e);
        return [];
      })
  );
};
