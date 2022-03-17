import { Admin } from "./admin.js";

export const adminMongoStore = {
  async getAllAdmins() {
    const admins = await Admin.find().lean();
    return admins;
  },

  async getAdminById(id) {
    if (id) {
      const admin = await Admin.findOne({ _id: id }).lean();
      return admin;
    }
    return null;
  },

  async addAdmin(admin) {
    const newAdmin = new Admin(admin);
    const adminObj = await newAdmin.save();
    const u = await this.getAdminById(adminObj._id);
    return u;
  },

  async getAdminByEmail(email) {
    const admin = await Admin.findOne({ email: email }).lean();
    return admin;
  },

  async deleteAdminById(id) {
    try {
      await Admin.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Admin.deleteMany({});
  },
};
