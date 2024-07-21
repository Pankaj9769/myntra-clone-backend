const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  removeFromBag,
  removeAllFromBag,
  addInBag,
  addAddress,
  removeAddress,
  addOrder,
  removeOrder,
} = require("../controller/auth-controller");
const userRouter = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

userRouter.route("/wishlist/add/:id").post(authMiddleware, addToWishlist);
userRouter
  .route("/wishlist/remove/:id")
  .post(authMiddleware, removeFromWishlist);

userRouter.route("/bag/add/:id").post(authMiddleware, addInBag);
userRouter.route("/bag/remove/all").post(authMiddleware, removeAllFromBag);
userRouter.route("/bag/remove/:id").post(authMiddleware, removeFromBag);
userRouter.route("/address/add").post(authMiddleware, addAddress);
userRouter.route("/address/remove/:id").post(authMiddleware, removeAddress);
userRouter.route("/order/add").post(authMiddleware, addOrder);
userRouter.route("/order/remove").post(authMiddleware, removeOrder);

module.exports = { userRouter };
