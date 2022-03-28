import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(placeMarkId, place) {
    await db.read();
    place._id = v4();
    place.placeMarkid = placeMarkId;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByPlaceMarkId(id) {
    await db.read();
    return db.data.places.filter((place) => place.placeMarkid === id);
  },

  async getPlaceById(id) {
    await db.read();
    return db.data.places.find((place) => place._id === id);
  },

  async deletePlace(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    db.data.places.splice(index, 1);
    await db.write();
  },
  async updatePlace(place, updatedPlace) {
    place.title = updatedPlace.title;
    place.description = updatedPlace.description;
    place.location = updatedPlace.location;
    place.category = updatedPlace.category;
    place.longitude = updatedPlace.longitude;
    place.latitude = updatedPlace.latitude;
    await db.places.write();
  },
  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },
};
