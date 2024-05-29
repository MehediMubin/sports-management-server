import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import router from "./routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: "https://unique-pony-72786f.netlify.app/",
    credentials: true,
  }),
);
app.use(cookieParser());

// routes
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Sports Management API",
    data: "Apatoto Nai",
  });
});

app.use(globalErrorHandler);

export default app;
