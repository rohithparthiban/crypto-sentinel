const db = require("../config/db");
const alertService = require("../services/alert.service");
const priceService = require("../services/price.service");


jest.spyOn(priceService, "getCryptoPrice")
  .mockResolvedValue(50000);

describe("Alert Trigger Logic", () => {
  let alertId;

  beforeAll(async () => {
    await db.query("DELETE FROM price_alerts");

    const result = await db.query(
      `INSERT INTO price_alerts (coin, target_price, condition)
       VALUES ('bitcoin', 1, 'ABOVE')
       RETURNING id`
    );

    alertId = result.rows[0].id;
  });

  test("Trigger alert only once", async () => {
    const alerts = await alertService.getActiveAlerts();
    expect(alerts.length).toBe(1);

    await alertService.markTriggered(alertId);
    const activeAfterTrigger = await alertService.getActiveAlerts();
    expect(activeAfterTrigger.length).toBe(0);
  });

  test("Reset allows re-trigger", async () => {
    await alertService.resetAlert(alertId);

    const alertsAfterReset = await alertService.getActiveAlerts();
    expect(alertsAfterReset.length).toBe(1);
  });
});
