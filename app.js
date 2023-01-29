"use strict";
// import createHttpError from 'http-errors';
import Express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import UsersRouter from "./routes/users.js";
import CaraRouter from "./routes/caraouselRoutes.js";
import ServRouter from "./routes/serviceRoutes.js";
import ProtoRouter from "./routes/protofolioRoutes.js";
import ContactRouter from "./routes/contactRoutest.js";
const __dirname = path.resolve();

const app = Express();
app.use(cors());
app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", UsersRouter); //* users api
app.use("/api/caraousel", CaraRouter); //* caraousel api
app.use("/api/pelayanan", ServRouter); //* pelayanan api
app.use("/api/protofolio", ProtoRouter); //* protofolio api
app.use("/api/contact", ContactRouter); //* contact api
app.use("/static", Express.static(path.join(__dirname, "public/images/")));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log(req);
  console.log(res);
  return res.status(404).send("404");
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

export default app;
