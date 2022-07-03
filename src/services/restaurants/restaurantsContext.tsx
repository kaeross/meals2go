import React, { createContext, useContext, useEffect, useState } from "react";
import { useRestaurantsQuery } from "../../hooks/useRestaurantsQuery";
import { LocationsContext } from "../locations/locationsContext";
import { Restaurant } from "../types";

export type AppContext = {
  restaurants: Restaurant[];
  isLoading: boolean;
  error: unknown;
};

const initialContext = {
  isLoading: false,
  restaurants: [],
  error: null,
};

export const RestaurantsContext = createContext<AppContext>(initialContext);

export const RestaurantsContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [locationQuery, setLocationQuery] = useState<string>();
  const { isLoading, data, error } = useRestaurantsQuery(locationQuery);

  const { location } = useContext(LocationsContext);

  useEffect(() => {
    console.log({ location });
    if (location) {
      setLocationQuery(geoToLocationString(location));
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        isLoading,
        restaurants: data ?? [],
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

const geoToLocationString = ({ lat, lng }: GeoLocation) => `${lat},${lng}`;
