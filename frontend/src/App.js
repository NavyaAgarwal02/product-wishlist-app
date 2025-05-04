import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wishlist from './components/Wishlist';
import ProductList from './components/ProductList';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const App = () => {
  const [user, setUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      loadWishlists(parsedUser.email);
    }
    setLoading(false);
  }, []);

  const loadWishlists = async (userEmail) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/wishlists/${userEmail}`);
      setWishlists(res.data);
    } catch (error) {
      console.error('Error loading wishlists:', error);
    }
  };

  const handleAuth = async () => {
    const email = prompt("Enter your email:");
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    const name = prompt("Enter your name:");
    if (!name) {
      alert('Please enter your name');
      return;
    }

    try {
      // Try signup first (it will return existing user if email exists)
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, { email, name });
      
      const userData = { email, name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      loadWishlists(email);
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setWishlists([]);
    setSelectedWishlist(null);
    localStorage.removeItem('user');
  };

  const createWishlist = () => {
    const title = prompt("Enter wishlist title:");
    if (!title) return;
    
    axios.post(`${BACKEND_URL}/api/wishlists`, { 
      title, 
      createdBy: user.email,
      products: []
    }).then(res => setWishlists([...wishlists, res.data]));
  };

  const loadWishlist = (wishlist) => {
    setSelectedWishlist(wishlist);
  };

  const inviteUser = async (wishlistId) => {
    const userEmail = prompt("Enter email of user to invite:");
    if (!userEmail || !userEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/wishlists/${wishlistId}/invite`,
        { email: userEmail }
      );

      setWishlists(wishlists.map(w => 
        w._id === wishlistId ? res.data : w
      ));

      if (selectedWishlist && selectedWishlist._id === wishlistId) {
        setSelectedWishlist(res.data);
      }

      alert(`Successfully invited ${userEmail} to the wishlist!`);
    } catch (error) {
      console.error('Error inviting user:', error);
      alert('Failed to invite user. Please try again.');
    }
  };

  const addProduct = async () => {
    if (!selectedWishlist) return;
    
    const name = prompt("Product name:");
    const imageUrl = prompt("Image URL:");
    const price = parseFloat(prompt("Price:"));
    
    if (!name || !imageUrl || isNaN(price)) {
      alert('Please provide all product details');
      return;
    }

    try {
      const newProduct = {
        name,
        imageUrl,
        price,
        addedBy: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedWishlist = {
        ...selectedWishlist,
        products: [...selectedWishlist.products, newProduct]
      };

      const res = await axios.put(
        `${BACKEND_URL}/api/wishlists/${selectedWishlist._id}`,
        updatedWishlist
      );

      setSelectedWishlist(res.data);
      setWishlists(wishlists.map(w => 
        w._id === selectedWishlist._id ? res.data : w
      ));
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  const deleteProduct = (productId) => {
    if (!selectedWishlist) return;

    const updatedWishlist = {
      ...selectedWishlist,
      products: selectedWishlist.products.filter(p => p._id !== productId)
    };

    axios.put(`${BACKEND_URL}/api/wishlists/${selectedWishlist._id}`, updatedWishlist)
      .then(res => {
        setSelectedWishlist(res.data);
        setWishlists(wishlists.map(w => 
          w._id === selectedWishlist._id ? res.data : w
        ));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      });
  };

  const deleteWishlist = (id) => {
    axios.delete(`${BACKEND_URL}/api/wishlists/${id}`)
      .then(() => {
        setWishlists(wishlists.filter(w => w._id !== id));
        if (selectedWishlist && selectedWishlist._id === id) {
          setSelectedWishlist(null);
        }
      })
      .catch(error => {
        console.error('Error deleting wishlist:', error);
        alert('Failed to delete wishlist. Please try again.');
      });
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ 
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <h1>Shared Wishlist App</h1>
        <button
          onClick={handleAuth}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Login / Sign Up
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20 
      }}>
        <div>
          <h2 style={{ margin: 0 }}>Shared Wishlist App</h2>
          <p style={{ margin: '5px 0', color: '#666' }}>
            Welcome, {user.name} ({user.email})
          </p>
        </div>
        <div>
          <button 
            onClick={createWishlist}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            Create Wishlist
          </button>
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <h3>My Wishlists</h3>
      {wishlists.map(wishlist => (
        <Wishlist
          key={wishlist._id}
          wishlist={wishlist}
          onSelect={loadWishlist}
          onDelete={deleteWishlist}
          onInvite={inviteUser}
          currentUser={user.email}
        />
      ))}

      {selectedWishlist && (
        <ProductList
          products={selectedWishlist.products}
          onAdd={addProduct}
          onDelete={deleteProduct}
          currentUser={user.email}
          wishlist={selectedWishlist}
        />
      )}
    </div>
  );
};

export default App;
