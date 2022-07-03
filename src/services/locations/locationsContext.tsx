import React, { createContext, useEffect, useState } from "react";
import { useLocationsQuery } from "../../hooks/useLocationsQuery";
import { GeoLocation, Geometry } from "../types";

export type LocationContext = {
  location?: GeoLocation;
  viewport?: Geometry["viewport"];
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
  const [lastViewport, setLastViewport] = useState<Geometry["viewport"]>();
  const [currLocation, setCurrLocation] = useState<GeoLocation>();
  const [currViewport, setCurrViewport] = useState<Geometry["viewport"]>();

  const onSearch = (query: string) => setSearchQuery(query);

  const { isLoading, data: geometry, error } = useLocationsQuery(searchQuery);

  const setLocationData = ({ location, viewport }: Geometry) => {
    setLastLocation(location);
    setLastViewport(viewport);
    setCurrLocation(location);
    setCurrViewport(viewport);
  };

  useEffect(() => {
    if (!geometry) {
      setCurrLocation(undefined);
      setCurrViewport(undefined);
      return;
    }

    setLocationData(geometry);
  }, [geometry]);

  return (
    <LocationsContext.Provider
      value={{
        isLoading,
        location: currLocation ?? lastLocation,
        viewport: currViewport ?? lastViewport,
        error,
        search: onSearch,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
