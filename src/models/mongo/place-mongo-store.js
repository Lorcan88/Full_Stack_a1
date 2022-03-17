import { Place } from "./place.js";
import { PlaceMark } from "./placeMark.js";

export const placeMongoStore = {
  async addPlace(placeMarkId, place) {
    place.placeMarkid = placeMarkId;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByPlaceMarkId(id) {
    const places = await Place.find({ placeMarkid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlace(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(place, updatedPlace) {
    place.name = updatedPlace.name;
    place.description = updatedPlace.description;
    place.location = updatedPlace.location;
    place.category = updatedPlace.category;
    place.longitude = updatedPlace.longitude;
    place.latitude = updatedPlace.latitude;
    await place.save();
  },
};
