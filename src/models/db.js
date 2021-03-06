import { userJsonStore } from "./json/user-json-store.js";
import { placeMarkJsonStore } from "./json/placeMark-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { adminJsonStore } from "./json/admin-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { placeMarkMemStore } from "./mem/placeMark-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";
import { placeMarkMongoStore } from "./mongo/placeMark-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { adminMongoStore } from "./mongo/admin-mongo-store.js";

export const db = {
  userStore: null,
  placeMarkStore: null,
  placeStore: null,
  adminStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placeMarkStore = placeMarkJsonStore;
        this.placeStore = placeJsonStore;
        this.adminStore = adminJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.adminStore = adminMongoStore;
        this.placeMarkStore = placeMarkMongoStore;
        this.placeStore = placeMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userJsonStore;
        this.placeMarkStore = placeMarkJsonStore;
        this.placeStore = placeJsonStore;
        this.adminStore = adminJsonStore;
    }
  },
};
