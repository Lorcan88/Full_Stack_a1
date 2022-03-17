import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  location: String,
  category: String,
  longitude: Number,
  latitude: Number,
  placeMarkid: {
    type: Schema.Types.ObjectId,
    ref: "PlaceMark",
  },
});

export const Place = Mongoose.model("Place", placeSchema);
