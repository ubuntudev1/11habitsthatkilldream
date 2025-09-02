const Order = require("../models/Order");

// Show order form
exports.getOrderForm = (req, res) => {
  res.render("buy-copy"); // This should be views/buy-copy.ejs
};

// Handle order submission
exports.postOrder = async (req, res) => {
  try {
    const { name, email, address, quantity, payment } = req.body;

    const newOrder = new Order({
      name,
      email,
      address,
      quantity,
      payment,
    });

    await newOrder.save();
    res.render("order-success", { name }); // success page
  } catch (error) {
    console.error(error);
    res.status(500).send("Error placing order");
  }
};

// Admin: View all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.render("orders", { orders });
  } catch (error) {
    res.status(500).send("Error fetching orders");
  }
};
