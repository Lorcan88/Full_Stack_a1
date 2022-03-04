import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { adminDashboardController } from "./controllers/Admin-controller.js";
import { placeMarkController } from "./controllers/placeMark-controller.js";
import { settingsController } from "./controllers/settings-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplaceMark", config: dashboardController.addPlaceMark },
  { method: "GET", path: "/dashboard/deleteplaceMark/{id}", config: dashboardController.deletePlaceMark },

  { method: "GET", path: "/adminDashboard", config: adminDashboardController.index },
  { method: "GET", path: "/adminUserViewDashboard/{id}", config: adminDashboardController.userViewIndex },
  { method: "GET", path: "/adminDashboard/deleteuser/{id}", config: adminDashboardController.deleteUser },

  { method: "GET", path: "/settings", config: settingsController.index },
  { method: "POST", path: "/settings/{id}/updatecurrentuser", config: settingsController.updateCurrentUser },

  { method: "GET", path: "/placeMark/{id}", config: placeMarkController.index },
  { method: "POST", path: "/placeMark/{id}/addplace", config: placeMarkController.addPlace },
  { method: "GET", path: "/placeMark/{id}/deleteplace/{placeid}", config: placeMarkController.deletePlace },

];