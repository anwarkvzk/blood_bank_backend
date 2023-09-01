const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

//express
const app = express();

//dot env config
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", require("./routes/testRoutes"));
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode On PORT ${process.env.PORT}`
      .bgBlue.white
  );
});
