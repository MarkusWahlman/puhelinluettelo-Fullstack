import express from "express";
import { apiRouter } from "./routes/Api";
const app = express();
import cors from "cors";

import { customMorgan } from "./middleware/customMorgan";

//Middleware
app.use(cors());
app.use(express.json());
app.use(customMorgan);

app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
