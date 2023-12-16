const { Schema, model } = require("mongoose");

const actuacioSchema = new Schema(
  {
    diada: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    castells: {
        type: String,
        required: true,
        trim: true
      },
    colles: {
        type: String,
        trim: true
      },
    photo: {
        type: String,
        default: '/images/castell-tipus-200px.jpg'
      },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true,
  }
);

const Actuacio = model("Actuacio", actuacioSchema);

module.exports = Actuacio;