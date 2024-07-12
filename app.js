const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connection } = require("./connection");
const { authRouter } = require("./router/auth-route");
const { userRouter } = require("./router/user-route");
connection();
app.use(cors());
app.use(express.json({
  origin: ["https://myntra-backend-rho.vercel.app"],
  methods: ["POST","GET"],
  credentials:true
}));
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
