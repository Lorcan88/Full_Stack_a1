import { db } from "../models/db.js";

export const adminDashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const placeMarks = await db.placeMarkStore.getAllPlaceMarks();
      const places = await db.placeStore.getAllPlaces();
      const viewData = {
        title: "Admin Place Mark Dashboard",
        admin: loggedInUser,
        user: users,
        placeMarks: placeMarks,
        place: places,
      };
      return h.view("adminDashboard-view", viewData);
    },
  },
  userViewIndex: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      const placeMarks = await db.placeMarkStore.getUserPlaceMarks(user._id);
      const viewData = {
        title: "Place Mark Dashboard",
        user: user,
        placeMarks: placeMarks,
      };
      return h.view("adminUserViewDashboard-view", viewData);
    },
  },

  userPlaceViewIndex: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const viewData = {
        title: "PlaceMark",
        placeMark: placeMark,
      };
      return h.view("adminUserPlaceViewDashboard-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/adminDashboard");
    },
  },
  deletePlace: {
    handler: async function (request, h) {
      const place = await db.placeStore.getPlaceById(request.params.id);
      await db.placeStore.deletePlace(place._id);
      return h.redirect("/adminDashboard");
    },
  },
};
