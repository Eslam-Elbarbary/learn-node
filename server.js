const env = require("./config/env");
const app = require("./app");
const port = env.port;
const nodeEnv = env.nodeEnv;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${nodeEnv} mode`);
});
