import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const settingsController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      //const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "About PlaceMark",
        user: loggedInUser,
      };
      return h.view("settings", viewData);
    },
  },

  updateCurrentUser: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("settings", { title: "Edit place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      //const loggedInUser = request.auth.credentials;
      //const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      await db.userStore.updateUser(request.params.id, viewData);
      return h.redirect("/login");
    },
  },
};
