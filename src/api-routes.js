import { userApi } from "./api/user-api.js";
import { placeMarkApi } from "./api/placeMark-api.js";
import { placeApi } from "./api/place-api.js";
import { placeController } from "./controllers/place-controller.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/placeMarks", config: placeMarkApi.create },
  { method: "DELETE", path: "/api/placeMarks", config: placeMarkApi.deleteAll },
  { method: "GET", path: "/api/placeMarks", config: placeMarkApi.find },
  { method: "GET", path: "/api/placeMarks/{id}", config: placeMarkApi.findOne },
  { method: "DELETE", path: "/api/placeMarks/{id}", config: placeMarkApi.deleteOne },
  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "POST", path: "/api/placeMarks/{id}/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },
  //{ method: "GET", path: "/api/place/{id}/editplace/{placeid}", config: placeController.index },
  //{ method: "POST", path: "/api/place/{id}/updateplace/{placeid}", config: placeController.update },
];
