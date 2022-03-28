import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(placeMarkId, place) {
    place._id = v4();
    place.placeMarkid = placeMarkId;
    places.push(place);
    return place;
  },

  async getPlacesByPlaceMarkId(id) {
    return places.filter((place) => place.placeMarkid === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getPlaceMarkPlaces(placeMarkId) {
    return places.filter((place) => place.placeMarkid === placeMarkId);
  },

  async deletePlace(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },
};
