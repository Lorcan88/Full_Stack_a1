import { db } from "../models/db.js";

export const adminDashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers()
      const viewData = {
        title: "Admin Place Mark Dashboard",
        admin: loggedInUser,
        user: users,
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
        user:user,
        placeMarks: placeMarks,
      };
      return h.view("adminUserViewDashboard-view", viewData);
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/adminDashboard");
    },
  },
};
