import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const placeMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async createPlaceMark(placeMark) {
    const res = await axios.post(`${this.placeMarkUrl}/api/placeMarks`, placeMark);
    return res.data;
  },

  async deleteAllPlaceMarks() {
    const response = await axios.delete(`${this.placeMarkUrl}/api/placeMarks`);
    return response.data;
  },

  async deletePlaceMark(id) {
    const response = await axios.delete(`${this.placeMarkUrl}/api/placeMarks/${id}`);
    return response;
  },

  async getAllPlaceMarks() {
    const res = await axios.get(`${this.placeMarkUrl}/api/placeMarks`);
    return res.data;
  },

  async getPlaceMark(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/placeMarks/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.placeMarkUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.placeMarkUrl}/api/placeMarks/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.placeMarkUrl}/api/places/${id}`);
    return res.data;
  },
};
