// global
import express from "express";
// local
import { URLController } from "./controller/url.controller";
import { Mongodb } from "./database/mongodb";

const PORT = 5000;

const api = express();
api.use(express.json());

const database = new Mongodb();
database.connect();

const urlController = new URLController();
api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

api.listen(PORT, () => {
  console.log(`server - express - running`);
  console.log(`http://localhost:${PORT}`);
});
