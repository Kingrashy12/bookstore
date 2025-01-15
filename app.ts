import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import ErrorBoundry from "./middleware/logger";
import { AuthorRoutes, BookRoutes, CategoryRoutes } from "./routes";
import { swaggerSpec, swaggerUi } from "./swagger";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authors", AuthorRoutes);
app.use("/category", CategoryRoutes);
app.use("/books", BookRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(ErrorBoundry);

export default app;
