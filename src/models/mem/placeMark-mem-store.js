import { v4 } from "uuid";
import { placeMemStore } from "./place-mem-store.js";

let placeMarks = [];

export const placeMarkMemStore = {
  async getAllPlaceMarks() {
    return placeMarks;
  },

  async addPlaceMark(placeMark) {
    placeMark._id = v4();
    placeMarks.push(placeMark);
    return placeMark;
  },

  async getPlaceMarkById(id) {
    const list = placeMarks.find((placeMark) => placeMark._id === id);
    list.places = await placeMemStore.getPlacesByPlaceMarkId(list._id);
    return list;
  },

  async getUserPlaceMarks(userid) {
    return placeMarks.filter((placeMark) => placeMark.userid === userid);
  },

  async deletePlaceMarkById(id) {
    const index = placeMarks.findIndex((placeMark) => placeMark._id === id);
    placeMarks.splice(index, 1);
  },

  async deleteAllPlaceMarks() {
    placeMarks = [];
  },
};
