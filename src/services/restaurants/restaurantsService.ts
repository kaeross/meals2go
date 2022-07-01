import { LocationResponse, LocationResults, Restaurant } from "../types";
import { mocks } from "./mock";
import camelize, { Camelize } from "camelize-ts";
import { faker } from "@faker-js/faker";

export const restaurantsRequest = async (
  location: string
): Promise<LocationResponse> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];

    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const restaurantService = async (
  location = "37.7749295,-122.4194155"
) => {
  try {
    // Make request, transform request
    const response = await restaurantsRequest(location);

    return requestTransformer(response.results);

    // console.log(transformedResponse);
  } catch (error) {
    throw error;
  }
};

type IconName = "restaurant" | "tapas";

const iconType: IconName[] = ["restaurant", "tapas"];

const getRandomIcon = () => {
  return iconType[faker.datatype.number({ min: 0, max: 1 })];
};

const requestTransformer = (locations: LocationResults[]): Restaurant[] => {
  return locations.map((location): Restaurant => {
    const {
      name,
      photos = [],
      vicinity,
      openingHours,
      rating,
      businessStatus,
    } = camelize(location);

    return {
      name,
      icon: getRandomIcon(),
      // Typecasting as any because camelize typing doesn't work with nesting
      photos: photos.map(({ photoReference }: any) => photoReference),
      address: vicinity ?? "",
      isOpenNow: (openingHours as any as Record<string, boolean>).openNow,
      rating,
      isClosedTemporarily: businessStatus === "CLOSED_TEMPORARILY",
    };
  });
};
