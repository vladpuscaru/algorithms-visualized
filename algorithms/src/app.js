import express from "express";
import cors from "cors";

import { router as pathfindingRouter } from "./routes/algorithms/pathfinding";

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/algorithms/pathfinding/', pathfindingRouter);

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
})