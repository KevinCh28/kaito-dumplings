import createApp from "./utils/createApp";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = "https://kaito-five.vercel.app";

async function main() {
  try {
    mongoose
      .connect(process.env.mongoURI as string)
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
    
    const app = createApp();
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
};

main();