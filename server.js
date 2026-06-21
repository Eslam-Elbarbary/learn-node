import env from "./config/env.js";
import app from "./app.js";

const port = env.port;
const nodeEnv = env.nodeEnv;

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${nodeEnv} mode`);
});