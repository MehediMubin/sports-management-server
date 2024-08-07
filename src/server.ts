import mongoose from "mongoose";
import seedSuperAdmin from "./DB";
import app from "./app";
import config from "./config";

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    app.listen(config.port, () => {
      console.log(`Sports Management app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

server();
