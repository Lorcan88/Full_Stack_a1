import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeMarkSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const PlaceMark = Mongoose.model("PlaceMark", placeMarkSchema);
