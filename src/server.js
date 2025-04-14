import express from "express";
import { getAllData, getFixedData, getDataById } from "./controller.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/data/all", getAllData);
app.get("/data/fixed", getFixedData);
app.get("/data/_id/:id", getDataById);

app.use((req, res, _) => {
  new ApiResponse(404, null, `Route ${req.originalUrl} not found`).send(res);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
