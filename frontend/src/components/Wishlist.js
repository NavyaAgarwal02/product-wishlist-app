import React from 'react';

const Wishlist = ({ wishlist, onSelect, onDelete, onInvite, currentUser }) => {
  const isOwner = currentUser === wishlist.createdBy;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0' }}>{wishlist.title}</h4>
          <p style={{ margin: '0', color: '#666', fontSize: '0.9em' }}>
            Created by: {wishlist.createdBy}
          </p>
          {wishlist.invitedUsers && wishlist.invitedUsers.length > 0 && (
            <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9em' }}>
              Shared with: {wishlist.invitedUsers.join(', ')}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onSelect(wishlist)}
            style={{
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View
          </button>
          {isOwner && (
            <>
              <button
                onClick={() => onInvite(wishlist._id)}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Invite
              </button>
              <button
                onClick={() => onDelete(wishlist._id)}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9em' }}>
        {wishlist.products.length} items
      </p>
    </div>
  );
};

export default Wishlist;
