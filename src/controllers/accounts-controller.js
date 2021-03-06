import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to PlaceMark" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for PlaceMark" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h
          .view("signup-view", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to PlaceMark" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      const admin = await db.adminStore.getAdminByEmail(email);
      if (user && user.password === password) {
        request.cookieAuth.set({ id: user._id });
        return h.redirect("/dashboard");
      } else if (admin && admin.password === password) {
        request.cookieAuth.set({ id: admin._id });
        return h.redirect("/adminDashboard");
      } else {
        return h.redirect("/");
      }
    },
  },

  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    const admin = await db.adminStore.getAdminById(session.id);
    if (user) {
      return { valid: true, credentials: user };
    }
    if (admin) {
      return { valid: true, credentials: admin };
    }
    return { valid: false };
  },
};
