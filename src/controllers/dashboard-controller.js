import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placeMarks = await db.placeMarkStore.getUserPlaceMarks(loggedInUser._id);
      const viewData = {
        title: "Place Mark Dashboard",
        user: loggedInUser,
        placeMarks: placeMarks,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaceMark: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlaceMark = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.placeMarkStore.addPlaceMark(newPlaceMark);
      return h.redirect("/dashboard");
    },
  },

  deletePlaceMark: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.placeMarkStore.deletePlaceMarkById(placeMark._id);
      return h.redirect("/dashboard");
    },
  },
  editUser: {
    handler: async function(request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id)
      const viewData = {
        title: "User settings",
        user: user,
      };
      return h.redirect("settings", viewData);
    },
  },
  updateCurrentUser: {
    handler: async function(request, h) {
      //const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(request.params.id)
      const viewData = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      await db.userStore.updateUser(user, viewData)
      return h.redirect(`/dashboard/${user._id}`);
    },
  },
};
