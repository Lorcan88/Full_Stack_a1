import { db } from "../models/db.js";
import { PlaceMarkSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: PlaceMarkSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add PlaceMark error", errors: error.details }).takeover().code(400);
      },
    },
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
};
