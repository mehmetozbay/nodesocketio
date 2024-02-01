const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    weightBridgeId: { type: Number, required: true },
    imgFront: { type: String },
    imgBack: { type: String },
    weight: { type: Number },
    weightType: { type: String },
    loadType: { type: String },
    frontPlate: { type: String },
    backPlate: { type: String },
  },
  {
    _id: true,
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;

        return {
          ...ret,
        };
      },
    },
  }
);

module.exports = mongoose.model("Weight", WeightSchema);
