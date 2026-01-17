const request = require("supertest");
const app = require("../app");
const db = require("../config/db");

describe("Alert API Tests", () => {
  let alertId;

  test("Create alert", async () => {
    const res = await request(app)
      .post("/alerts")
      .send({
        coin: "bitcoin",
        targetPrice: 1,
        condition: "ABOVE"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.coin).toBe("bitcoin");

    alertId = res.body.id;
  });

  test("List alerts", async () => {
    const res = await request(app).get("/alerts");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Reset alert", async () => {
    const res = await request(app)
      .put(`/alerts/${alertId}/reset`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Alert reset successfully");
  });

  test("Delete alert", async () => {
    const res = await request(app)
      .delete(`/alerts/${alertId}`);

    expect(res.statusCode).toBe(200);
  });
});
