import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["Commercial", "Residential", "Plot"],
      required: true,
    },
    overview: { type: String },
    description: { type: String, required: true },
    area: { type: String },
    priceList: [
      {
        unitType: String,
        price: String,
      },
    ],
    gallery: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length <= 4; 
        },
        message: "Gallery cannot contain more than 4 images",
      },
    },
    amenities: [String],
    locationMap: { type: String },
    location: { type: String, required: true },
    contact: {
      phone: { type: String },
      email: { type: String },
    },
    nearby: [String],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
