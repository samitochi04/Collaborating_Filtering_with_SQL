import React, { useState } from 'react';

function ItemSearch({ onSearch }) {
  const [itemId, setItemId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemId) {
      onSearch(itemId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="number"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
        placeholder="Entrez l'ID de l'item"
        min="1"
        required
      />
      <button type="submit">Recommendations</button>
    </form>
  );
}

export default ItemSearch;
