const db = require("../config/db");

beforeAll(async () => {
  await db.query("DELETE FROM price_alerts");
});

afterAll(async () => {
  await db.end();
});
