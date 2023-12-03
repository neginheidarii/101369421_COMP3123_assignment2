const express = require("express");
const Employee = require("../models/employeeModel");

const empRouter = express.Router();

// Allow user to get all employee list
empRouter.get("/employees", async (req, res) => {
  try {
    const employee = await Employee.find();
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

//User can create new employee
empRouter.post("/employees", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message:
        "You have to fill all required information to create a new user.",
    });
  }
  try {
    const newEmp = new Employee(req.body);
    saveNewEmp = await newEmp.save();
    console.log(saveNewEmp);
    res.status(201).json(saveNewEmp);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //User can get employee details by employee id
empRouter.get("/employees/:eid", async (req, res) => {
  try {
    const getEmpById = await Employee.findById(req.params.eid);
    if (!getEmpById) {
      res.status(404).json({
        message: "Employee not found",
      });
    }
    res.status(200).json(getEmpById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allow user to update employee details
empRouter.put("/employees/:eid", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.eid,
      req.body,
      { new: true }
    );
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Allow user to delete employee by employee id
empRouter.delete("/employees/:eid", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.eid);
    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
    }
    res.status(204).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = empRouter;
