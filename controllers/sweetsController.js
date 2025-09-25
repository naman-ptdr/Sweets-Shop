import Sweet from '../models/Sweet.js';

// Add a new sweet (Admin only)
export const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantityInStock } = req.body;

    const existingSweet = await Sweet.findOne({ name });
    if (existingSweet) return res.status(400).json({ msg: 'Sweet already exists' });

    const sweet = new Sweet({ name, category, price, quantityInStock });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Get all sweets
export const getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Search sweets by name, category, or price range
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Update sweet details (Admin only)
export const updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });

    const { name, category, price, quantityInStock } = req.body;
    if (name) sweet.name = name;
    if (category) sweet.category = category;
    if (price !== undefined) sweet.price = price;
    if (quantityInStock !== undefined) sweet.quantityInStock = quantityInStock;

    await sweet.save();
    res.json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Delete sweet (Admin only)
export const deleteSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });

    await sweet.remove();
    res.json({ msg: 'Sweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// Purchase sweet (decrease quantity)
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });
    if (sweet.quantityInStock < 1) return res.status(400).json({ msg: 'Sweet out of stock' });

    sweet.quantityInStock -= 1;
    await sweet.save();
    res.json({ msg: 'Purchase successful', sweet });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Restock sweet (Admin only)
export const restockSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: 'Sweet not found' });

    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ msg: 'Invalid quantity' });

    sweet.quantityInStock += quantity;
    await sweet.save();
    res.json({ msg: 'Restock successful', sweet });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
