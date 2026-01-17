const alertService = require("../services/alert.service");

exports.createAlert = async (req, res) => {
  const alert = await alertService.createAlert(req.body);
  res.status(201).json(alert);
};

exports.listAlerts = async (req, res) => {
  const alerts = await alertService.getAlerts();
  res.json(alerts);
};

exports.deleteAlert = async (req, res) => {
  await alertService.deleteAlert(req.params.id);
  res.json({ message: "Alert deleted" });
};

exports.resetAlert = async (req, res) => {
  await alertService.resetAlert(req.params.id);
  res.json({ message: "Alert reset successfully" });
};

