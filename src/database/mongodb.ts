// global
import mongoose from "mongoose";
// local
import { config } from "../config/constants";

const options = { useNewUrlParser: true, useUnifiedTopology: true };

export class Mongodb {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(config.MONGODB_CONECTION);
      console.log("database - connect - success");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}
