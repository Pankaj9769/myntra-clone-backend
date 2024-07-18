const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connection } = require("./connection");
const { authRouter } = require("./router/auth-route");
const { userRouter } = require("./router/user-route");
const { productRouter } = require("./router/product-route");

connection();

app.use(cors());
app.options(
  "*",
  cors({
    origin: [
      "https://myntra-frontend-tau.vercel.app/",
      "http://localhost:5173",
      "https://myntra-frontend-c9345icmh-pankaj-parihars-projects.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
