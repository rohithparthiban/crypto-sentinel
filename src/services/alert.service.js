const db = require("../config/db");

exports.createAlert = async ({ coin, targetPrice, condition }) => {
  const result = await db.query(
    `INSERT INTO price_alerts (coin, target_price, condition)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [coin, targetPrice, condition]
  );
  return result.rows[0];
};

exports.getAlerts = async () => {
  const result = await db.query(
    "SELECT * FROM price_alerts ORDER BY id DESC"
  );
  return result.rows;
};

exports.deleteAlert = async (id) => {
  await db.query("DELETE FROM price_alerts WHERE id = $1", [id]);
};

exports.getActiveAlerts = async () => {
  const result = await db.query(
    "SELECT * FROM price_alerts WHERE status = 'ACTIVE'"
  );
  return result.rows;
};

exports.markTriggered = async (id) => {
  await db.query(
    `UPDATE price_alerts
     SET status = 'TRIGGERED', updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [id]
  );
};

exports.resetAlert = async (id) => {
  await db.query(
    `UPDATE price_alerts
     SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP
     WHERE id = $1`,
    [id]
  );
};

