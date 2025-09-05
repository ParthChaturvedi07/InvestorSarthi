import express from "express";
const app = express();
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./config/db.js";
connectToDb();

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// If behind a proxy and using secure cookies:
app.set("trust proxy", 1);

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development",
      httpOnly: true,
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
