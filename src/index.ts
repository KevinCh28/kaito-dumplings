import createApp from "./utils/createApp";
import mongoose from "mongoose";
const db = require("../config/keys").mongoURI;
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    mongoose
      .connect(db)
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
    
    const app = createApp();
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
};

main();