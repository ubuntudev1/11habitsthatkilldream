const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Order form
router.get("/buy-copy", orderController.getOrderForm);
router.post("/buy-copy", orderController.postOrder);

// Admin route to see orders
router.get("/admin/orders", orderController.getAllOrders);

module.exports = router;
