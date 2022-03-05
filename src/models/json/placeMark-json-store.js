import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { placeJsonStore } from "./place-json-store.js";

const db = new Low(new JSONFile("./src/models/json/placeMarks.json"));
db.data = { placeMarks: [] };

export const placeMarkJsonStore = {
  async getAllPlaceMarks() {
    await db.read();
    return db.data.placeMarks;
  },

  async addPlaceMark(placeMark) {
    await db.read();
    placeMark._id = v4();
    db.data.placeMarks.push(placeMark);
    await db.write();
    return placeMark;
  },

  async getPlaceMarkById(id) {
    await db.read();
    const list = db.data.placeMarks.find((placeMark) => placeMark._id === id);
    list.places = await placeJsonStore.getPlacesByPlaceMarkId(list._id);
    return list;
  },

  async getUserPlaceMarks(userid) {
    await db.read();
    return db.data.placeMarks.filter(
      (placeMark) => placeMark.userid === userid
    );
  },

  async deletePlaceMarkById(id) {
    await db.read();
    const index = db.data.placeMarks.findIndex(
      (placeMark) => placeMark._id === id
    );
    db.data.placeMarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaceMarks() {
    db.data.placeMarks = [];
    await db.write();
  },
};
