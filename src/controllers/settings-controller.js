import { db } from "../models/db.js";

export const settingsController = {
  index: {
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      //const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "About PlaceMark",
        user: loggedInUser
      };
      return h.view("settings", viewData);
    },
  },

  
  updateCurrentUser: {
    handler: async function (request, h) {
      //const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      await db.userStore.updateUser(user, viewData);
      return h.redirect("/login");
    },
  },
};
