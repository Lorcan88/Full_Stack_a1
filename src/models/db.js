
import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placeMark-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { adminJsonStore } from "./json/admin-json-store.js";


export const db = {
  userStore: null,
  placeMarkStore: null,
  placeStore: null,
  adminStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placeMarkStore = placeMarkJsonStore;
    this.placeStore = placeJsonStore;
    this.adminStore = adminJsonStore;
  },
};
