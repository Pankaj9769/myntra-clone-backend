const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connection } = require("./connection");
const { authRouter } = require("./router/auth-route");
const { userRouter } = require("./router/user-route");
connection();
app.use(
  cors({
    origin: ["https://myntra-frontend-tau.vercel.app/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
