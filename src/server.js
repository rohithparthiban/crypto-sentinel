require("dotenv").config();
const app = require("./app");

// start worker
require("./workers/priceMonitor.worker");

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
