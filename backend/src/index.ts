import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { apiRouter } from "./routes/Api";
const app = express();
import cors from "cors";

import { customMorgan } from "./middleware/customMorgan";
import errorHandler from "./middleware/errorHandler";

//Middleware
app.use(cors());
app.use(express.json());
app.use(customMorgan);
app.use(express.static("../frontend/dist"));

app.use("/api", apiRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
