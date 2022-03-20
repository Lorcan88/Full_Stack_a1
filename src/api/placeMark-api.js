import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placeMarkApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placeMarks = await db.placeMarkStore.getAllPlaceMarks();
        return placeMarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
        if (!placeMark) {
          return Boom.notFound("No PlaceMark with this id");
        }
        return placeMark;
      } catch (err) {
        return Boom.serverUnavailable("No PlaceMark with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placeMark = request.payload;
        const newPlaceMark = await db.placeMarkStore.addPlaceMark(placeMark);
        if (newPlaceMark) {
          return h.response(newPlaceMark).code(201);
        }
        return Boom.badImplementation("error creating placeMark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const placeMark = await db.placeMarkStore.getPlaceMarkById(request.params.id);
        if (!placeMark) {
          return Boom.notFound("No PlaceMark with this id");
        }
        await db.placeMarkStore.deletePlaceMarkById(placeMark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No PlaceMark with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.placeMarkStore.deleteAllPlaceMarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
