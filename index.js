const express = require("express");
const userRoutes = require("./routes/userRoutes");
const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});