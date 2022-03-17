import { PlaceMark } from "./placeMark.js";
import { placeMongoStore } from "./place-mongo-store.js";

export const placeMarkMongoStore = {
  async getAllPlaceMarks() {
    const placeMarks = await PlaceMark.find().lean();
    return placeMarks;
  },

  async getPlaceMarkById(id) {
    if (id) {
      const placeMark = await PlaceMark.findOne({ _id: id }).lean();
      if (placeMark) {
        placeMark.places = await placeMongoStore.getPlacesByPlaceMarkId(placeMark._id);
      }
      return placeMark;
    }
    return null;
  },

  async addPlaceMark(placeMark) {
    const newPlaceMark = new PlaceMark(placeMark);
    const placeMarkObj = await newPlaceMark.save();
    return this.getPlaceMarkById(placeMarkObj._id);
  },

  async getUserPlaceMarks(id) {
    const placeMark = await PlaceMark.find({ userid: id }).lean();
    return placeMark;
  },

  async deletePlaceMarkById(id) {
    try {
      await PlaceMark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaceMarks() {
    await PlaceMark.deleteMany({});
  },
};
