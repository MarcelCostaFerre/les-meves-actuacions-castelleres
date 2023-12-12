const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
        default: '../public/images/castell-tipus.png',
      },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Actuacio = model("Actuacio", actuacioSchema);

module.exports = Actuacio;