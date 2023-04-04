const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  date_birth: {
    type: String,
  },

  adress: {
    type: String,
  },

  diplom: {
    type: String,
  },
  date_of_entry: {
    type: String,
  },
  releaseDate: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,

    required: true,
  },
  position: {
    type: String
  },

  phone: Number,
});

module.exports = User = model("user", UserSchema);