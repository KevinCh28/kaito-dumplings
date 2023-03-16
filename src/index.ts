import createApp from "./utils/createApp";
import mongoose from "mongoose";
import http from "http";

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    mongoose
      .connect(process.env.mongoURI as string)
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
    
    const app = createApp();
    const server = http.createServer(app)
    server.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
};

main();