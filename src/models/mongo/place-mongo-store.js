import { Place } from "./place.js";

export const placeMongoStore = {
  async getPlacesByPlaceMarkId(id) {
    const places = await Place.find({ placeMarkid: id }).lean();
    return places;
  },
};
