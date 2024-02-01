const Weight = require("../model/Weight");
const mongoose = require("mongoose");
const express = require("express");

function WeightRouter(io) {
  const router = express.Router();

  router.post("/start-weight", async (req, res) => {
    const newWeight = new Weight(req.body);
    io.emit("start_Weight", newWeight);
    try {
      const savedWeight = await newWeight.save();
      res.status(200).json(savedWeight);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post("/end-weight/:userId/:weightId", async (req, res) => {
    try {
      const newWeight = await Weight.findOne({
        userId: req.params.userId,
        weightBridgeId: req.params.weightId,
        createdAt: { $gte: new Date().getTime() - 10 * 60 * 1000 },
      });
      if (newWeight) {
        newWeight.imgFront = req.body.imgFront;
        newWeight.imgBack = req.body.imgBack;
        newWeight.weight = req.body.weight;
        newWeight.weightType = req.body.weightType;
        newWeight.loadType = req.body.loadType;
        newWeight.frontPlate = req.body.frontPlate;
        newWeight.backPlate = req.body.backPlate;
        console.log(newWeight);
        await newWeight.save();
        io.emit("end_Weight", newWeight);
        res.status(200).json(newWeight);
      } else {
        res.status(500).json({
          message:
            "Belirtilen sure icerisinde olcum gerceklesmedi lutfen tekrar qr kodu okutunuz",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/:userId", async (req, res) => {
    try {
      const newWeight = await Weight.find({
        userId: req.params.userId,
        createdAt: { $gte: new Date().getTime() - 10 * 60 * 1000 },
      });
      io.emit("mod_Weight", newWeight);
      res.status(200).json(newWeight);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  return {
    router,
  };
}

module.exports = WeightRouter;
