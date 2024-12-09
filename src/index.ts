import express from "express";
import { apiRouter } from "./routes/Api";
const app = express();

//Middleware
app.use(express.json());

app.use("/api", apiRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
