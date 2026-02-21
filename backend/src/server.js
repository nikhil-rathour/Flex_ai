import app from "./app.js";
import connectDB from "./configs/db.js";
import { syncPalettesFromSeed } from "./palette/paletteSeedService.js";
import dotenv  from "dotenv"

dotenv.config()
const PORT = process.env.PORT || 4000

const startServer = async () => {
  try {
    await connectDB();
    await syncPalettesFromSeed();
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
