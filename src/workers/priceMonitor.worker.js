const cron = require("node-cron");
const alertService = require("../services/alert.service");
const { getCryptoPrice } = require("../services/price.service");

cron.schedule("*/1 * * * *", async () => {
  console.log("Checking crypto prices...");

  const alerts = await alertService.getActiveAlerts();

  for (const alert of alerts) {
    const price = await getCryptoPrice(alert.coin);

    const triggered =
      alert.condition === "ABOVE"
        ? price >= alert.target_price
        : price <= alert.target_price;

    if (triggered) {
      await alertService.markTriggered(alert.id);
      console.log(
        `ALERT TRIGGERED: ${alert.coin.toUpperCase()} at $${price}`
      );
    }
  }
});
