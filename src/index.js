const createApp = require("./utils/createApp");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

const PORT = process.env.PORT || 3001;


async function main() {
  try {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
    
    const app = createApp();
    app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch(err) {
    console.log(err);
  }
};

main();