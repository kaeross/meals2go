import React, { createContext, useEffect, useState } from "react";
import { useLocationsQuery } from "../../hooks/useLocationsQuery";
import { GeoLocation } from "../types";

export type LocationContext = {
  location?: GeoLocation;
  isLoading: boolean;
  error?: unknown;
  search: (query: string) => void;
};

const initialContext = {
  isLoading: false,
  search: () => {},
};

export const LocationsContext = createContext<LocationContext>(initialContext);

export const LocationsContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const [lastLocation, setLastLocation] = useState<GeoLocation>();

  const onSearch = (query: string) => setSearchQuery(query);

  const { isLoading, data: location, error } = useLocationsQuery(searchQuery);

  useEffect(() => {
    if (location) {
      setLastLocation(location);
    }
  }, [location]);

  return (
    <LocationsContext.Provider
      value={{
        isLoading,
        location: location ?? lastLocation,
        error,
        search: onSearch,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
