import { PlaceSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placeController = {
  index: {
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        title: "Edit place",
        placeMark: placeMark,
        place: place,
      };
      return h.view("place-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("place-view", { title: "Edit place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
      const newPlace = {
        name: request.payload.name,
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
};
