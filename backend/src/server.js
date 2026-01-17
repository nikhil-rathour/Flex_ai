import app from "./app.js";
import connectDB from "./configs/db.js";
import dotenv  from "dotenv"

dotenv.config()
connectDB()
const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
