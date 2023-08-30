import express from "express";
import {
  createProduct,
  detailedProduct,
  payment,
  readProducts,
} from "../controller/storeController";

const router = express.Router();

router.route("/view-products").get(readProducts);
router.route("/make-payment").post(payment);
router.route("/create-products").post(createProduct);
router.route("/:productID/product-detail").get(detailedProduct);

export default router;
