const express = require("express");
const router = express.Router();
const controller = require("../controllers/alert.controller");

router.post("/", controller.createAlert);
router.get("/", controller.listAlerts);
router.delete("/:id", controller.deleteAlert);
router.put("/:id/reset", controller.resetAlert);

module.exports = router;
