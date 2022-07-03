import { GeoLocationResults, Geometry } from "../types";
import { locations as mocks } from "./mock";

export const locationsRequest = async (
  searchTerm: string
): Promise<GeoLocationResults> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[searchTerm];

    setTimeout(() => {
      if (!mock) {
        reject("not found");
      }
      resolve(mock);
    }, 1000);
  });
};

export const locationService = async (location = "antwerp") => {
  try {
    // Make request, transform request
    const response = await locationsRequest(location.toLowerCase());

    return requestTransformer(response.results);
  } catch (error) {
    throw error;
  }
};

const requestTransformer = (
  locationResults: GeoLocationResults["results"]
): Geometry => {
  const { geometry } = locationResults[0];

  if (!geometry) {
    throw new Error("Could not get location data");
  }

  return geometry;
};
