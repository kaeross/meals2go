export type GeoLocation = {
  lat: number;
  lng: number;
};

export type Geometry = {
  location: GeoLocation;
  viewport: {
    northeast: GeoLocation;
    southwest: GeoLocation;
  };
};

export type LocationResults = Record<string, unknown> & {
  geometry: Geometry;
  icon?: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
  place_id?: string;
  price_level?: number;
  rating?: number;
  types?: string[];
  user_ratings_total?: number;
  vicinity?: string;
  business_status?: "OPERATIONAL" | "CLOSED_TEMPORARILY" | string;
};

export type LocationResponse = {
  html_attributions: unknown[];
  next_page_token: string;
  results: LocationResults[];
  status: string;
};

export type Restaurant = {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow?: boolean;
  rating?: number;
  isClosedTemporarily?: boolean;
};

export type GeoLocationResults = {
  results: {
    geometry: Geometry;
  }[];
  status?: "OK";
};
