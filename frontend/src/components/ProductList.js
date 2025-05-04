import React from 'react';

const ProductList = ({ products, onAdd, onDelete, currentUser, wishlist }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h3>Products in {wishlist.title}</h3>
      <button 
        onClick={onAdd}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        Add Product
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div 
            key={product._id} 
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '4px',
                marginBottom: '10px'
              }}
            />
            <h4 style={{ margin: '10px 0' }}>{product.name}</h4>
            <p style={{ color: '#2E7D32', fontWeight: 'bold', margin: '5px 0' }}>
              ${product.price.toFixed(2)}
            </p>
            <p style={{ color: '#666', fontSize: '0.9em', margin: '5px 0' }}>
              Added by: {product.addedBy}
            </p>
            <p style={{ color: '#666', fontSize: '0.8em', margin: '5px 0' }}>
              Added: {formatDate(product.createdAt)}
            </p>
            {product.updatedAt !== product.createdAt && (
              <p style={{ color: '#666', fontSize: '0.8em', margin: '5px 0' }}>
                Updated: {formatDate(product.updatedAt)}
              </p>
            )}
            {(currentUser === product.addedBy || currentUser === wishlist.createdBy) && (
              <button
                onClick={() => onDelete(product._id)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  marginTop: '10px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
