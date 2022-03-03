import { v4 } from "uuid";

let admin = [];

export const adminMemStore = {
  async getAllAdmins() {
    return admin;
  },

  async addAdmin(user) {
    user._id = v4();
   admin.push(user);
    return admin;
  },

  async getAdminById(id) {
    return admin.find((admin) => admin._id === id);
  },

  async getAdminByEmail(email) {
    return admin.find((admin) => admin.email === email);
  },

  async deleteAdminById(id) {
    const index = admin.findIndex((admin) => admin._id === id);
    admin.splice(index, 1);
  },

  async deleteAll() {
    admin = [];
  },
};
