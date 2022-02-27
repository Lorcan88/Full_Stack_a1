// import { userMemStore } from "./mem/user-mem-store.ts";
// import { placeMarkMemStore } from "./mem/playlist-mem-store.ts";
// import { placeMemStore } from "./mem/track-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placeMark-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  placeStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placeMarkStore = placeMarkJsonStore;
    this.placeStore = placeJsonStore;
  },
};
