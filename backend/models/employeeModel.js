const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const express = require("express");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },

  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },

  // gender with constraint male/female/other
  gender: {
    type: String,
    require: true,
    enum: ["Male", "Female", "Other"],
    maxlength: 10,
  },

  salary: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
