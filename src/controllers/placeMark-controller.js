import { db } from "../models/db.js";

export const placeMarkController = {
  index: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const viewData = {
        title: "PlaceMark",
        placeMark: placeMark,
      };
      return h.view("placeMark-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const newPlace = {
        title: request.payload.title,
        description: request.payload.description,
        location: request.payload.location,
        category: request.payload.category,
        longitude: Number(request.payload.longitude),
        latitude: Number(request.payload.latitude),
      };
      await db.placeStore.addPlace(placeMark._id, newPlace);
      return h.redirect(`/placeMark/${placeMark._id}`);
    },
  },

  deletePlace: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      await db.placeStore.deletePlace(request.params.placeid);
      return h.redirect(`/placeMark/${placeMark._id}`);
    },
  },
};
