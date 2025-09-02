const Blog = require("../models/blog");

// Index page
exports.getIndex = async (req, res) => {
  try {
    // Show latest 3 blogs on homepage
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render("index", { blogs });
  } catch (err) {
    res.status(500).send("Error loading homepage");
  }
};

// Blog list
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blogs", { blogs });
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
};

// Single blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Blog not found");
    res.render("blogDetail", { blog });
  } catch (err) {
    res.status(500).send("Error fetching blog");
  }
};

// Upload form
exports.getUploadPage = (req, res) => {
  res.render("blogUpload");
};

exports.getCopy = (req, res) => {
  res.render("buy-copy");
};
// Post upload
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    await Blog.create({ title, content, author });
    res.redirect("/blog");
  } catch (err) {
    res.status(500).send("Error creating blog");
  }
};

const Order = require("../models/Order");

// Show order form
exports.getOrderForm = (req, res) => {
  res.render("buy-copy"); // This should be views/buy-copy.ejs
};

// Handle order submission
exports.postOrder = async (req, res) => {
  try {
    const { name, email, address, quantity, payment,phone } = req.body;

    const newOrder = new Order({
      name,
      email,
      address,
      quantity,
      payment,
      phone
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
