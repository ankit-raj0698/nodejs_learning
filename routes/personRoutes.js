const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // req body contains person data

    //create new person document using mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data saved");
    res.status(200).json(data);
  } catch (err) {
    console.log("error");
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await Person.find({ work: workType });
      console.log("data saved");
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "invlaid work type" });
    }
  } catch (err) {
    console.log("error");
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return updated documents
        runValidators: true, // run mongoose schema validation
      }
    );

    if (!response) {
      res.status(404).json({ error: "person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("error");
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted" });
  } catch (err) {
    console.log("error:", err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
