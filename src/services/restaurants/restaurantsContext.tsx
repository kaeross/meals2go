import React, { createContext } from "react";
import { useRestaurantsQuery } from "../../hooks/useRestaurantsQuery";
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
  const { isLoading, data, error } = useRestaurantsQuery();

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
