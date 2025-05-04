const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Create new wishlist
router.post('/', async (req, res) => {
  try {
    const { title, createdBy, products } = req.body;
    const wishlist = new Wishlist({ 
      title, 
      createdBy, 
      products: products || [],
      invitedUsers: []
    });
    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get wishlists by email
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const wishlists = await Wishlist.find({
      $or: [
        { createdBy: email },
        { invitedUsers: email }
      ]
    });
    res.json(wishlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update wishlist
router.put('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete wishlist
router.delete('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json({ message: 'Wishlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add/update product in wishlist
router.put('/:wishlistId/products/:productId', async (req, res) => {
  try {
    const { wishlistId, productId } = req.params;
    const { name, imageUrl, price } = req.body;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const product = wishlist.products.id(productId);
    if (product) {
      product.name = name;
      product.imageUrl = imageUrl;
      product.price = price;
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Invite user to wishlist
router.post('/:wishlistId/invite', async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const { email } = req.body;
    
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    if (!wishlist.invitedUsers.includes(email)) {
      wishlist.invitedUsers.push(email);
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;