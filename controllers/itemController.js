const ItemModel = require("../modes/itemModel");

// GET all items
const getAllItems = (req, res, next) => {
  try {
    const items = ItemModel.getAll();

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

// GET single item
const getItemById = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID"
      });
    }

    const item = ItemModel.getById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

// CREATE item
const createItem = (req, res, next) => {
  try {
    const { name, category, quantity, price, supplier } = req.body;

    if (!name || !category || quantity === undefined || price === undefined || !supplier) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, category, quantity, price, supplier"
      });
    }

    if (
      typeof name !== "string" ||
      typeof category !== "string" ||
      typeof supplier !== "string" ||
      typeof quantity !== "number" ||
      typeof price !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data types. name, category, supplier must be strings; quantity and price must be numbers"
      });
    }

    if (quantity < 0 || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity and price must be non-negative"
      });
    }

    const newItem = ItemModel.create({
      name,
      category,
      quantity,
      price,
      supplier
    });

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: newItem
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE item
const updateItem = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID"
      });
    }

    const { name, category, quantity, price, supplier } = req.body;

    if (!name || !category || quantity === undefined || price === undefined || !supplier) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, category, quantity, price, supplier"
      });
    }

    if (
      typeof name !== "string" ||
      typeof category !== "string" ||
      typeof supplier !== "string" ||
      typeof quantity !== "number" ||
      typeof price !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid data types. name, category, supplier must be strings; quantity and price must be numbers"
      });
    }

    if (quantity < 0 || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity and price must be non-negative"
      });
    }

    const updatedItem = ItemModel.update(id, {
      name,
      category,
      quantity,
      price,
      supplier
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    next(error);
  }
};

// DELETE item
const deleteItem = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID"
      });
    }

    const deletedItem = ItemModel.delete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deletedItem
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};