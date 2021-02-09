import bodyParser from "body-parser";
import express from "express";
import saladRoutes from "./salad/routes";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => res.json("TD EXAM"));
app.use("/salads", saladRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
