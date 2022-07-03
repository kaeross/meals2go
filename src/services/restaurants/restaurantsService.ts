import { RestaurantResults, RestaurantResponse, Restaurant } from "../types";
import { mockImages, mocks } from "./mock";
import { faker } from "@faker-js/faker";

export const restaurantsRequest = async (
  location: string
): Promise<RestaurantResponse> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];

    setTimeout(() => {
      if (!mock) {
        reject("not found");
      }
      resolve(mock);
    }, 1000);
  });
};

export const restaurantService = async (
  location = "37.7749295,-122.4194155"
) => {
  try {
    // Make request, transform request
    const response = await restaurantsRequest(location);

    return requestTransformer(response.results);
  } catch (error) {
    throw error;
  }
};

type IconName = "restaurant" | "tapas";

const iconType: IconName[] = ["restaurant", "tapas"];

const getRandomIcon = () => {
  return iconType[faker.datatype.number({ min: 0, max: 1 })];
};

const getRandomPhoto = () => {
  return mockImages[
    faker.datatype.number({ min: 0, max: mockImages.length - 1 })
  ];
};

const requestTransformer = (locations: RestaurantResults[]): Restaurant[] => {
  return locations.map((location): Restaurant => {
    const {
      name,
      photos,
      vicinity,
      openingHours,
      rating,
      businessStatus,
      geometry,
    } = location;

    const photoRefs = photos?.map(({ photo_reference }) =>
      photo_reference ? photo_reference : getRandomPhoto()
    ) ?? [getRandomPhoto()];

    return {
      name,
      icon: getRandomIcon(),
      // Typecasting as any because camelize typing doesn't work with nesting
      photos: photoRefs.length ? photoRefs : mockImages,
      address: vicinity ?? "",
      isOpenNow:
        (openingHours as any as Record<string, boolean>)?.openNow ?? true,
      rating,
      isClosedTemporarily: businessStatus === "CLOSED_TEMPORARILY",
      geometry,
    };
  });
};
