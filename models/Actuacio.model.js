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
      type: Date,
      required: true,
    },
    castells: {
        type: String,
        required: true,
      },
    colles: {
        type: String,
      },
    photo: {
        type: String,
        default: '../public/images/castell-tipus.jpg',
      },
    author: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  {
    timestamps: true,
  }
);

const Actuacio = model("Actuacio", actuacioSchema);

module.exports = Actuacio;