const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connection } = require("./connection");
const { authRouter } = require("./router/auth-route");
const { userRouter } = require("./router/user-route");

connection();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://myntra-frontend-c9345icmh-pankaj-parihars-projects.vercel.app",
    "https://myntra-frontend-tau.vercel.app/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors());
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
