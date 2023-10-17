require("dotenv").config({ path: __dirname + "/.env" });

import express from "express";
import { parseBodyAsJson, validateBody } from "./middleware/validators";

const emailController = require("./controllers/EmailController");
const app = express();
const port = process.env.PORT || 8000;

var cors = require("cors");

app.use(cors({ origin: process.env.CLIENT_API }));
app.use(parseBodyAsJson);

app.post(
  "/message",
  validateBody(["name", "email", "message"]),
  emailController.sendEmail
);

app.listen(port, () => console.log(`Listening on port ${port}`));
