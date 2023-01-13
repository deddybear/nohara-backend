"use strict";
// import createHttpError from 'http-errors';
import Express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import UsersRouter from "./routes/users.js";
import CaraRouter from "./routes/caraouselRoutes.js";

const app = Express();
app.use(cors());
app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Express.static(path.join("public")));

app.use("/api/users", UsersRouter);
app.use("/api/caraousel", CaraRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
