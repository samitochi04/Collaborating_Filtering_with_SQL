import React from 'react';

function RecommendationList({ title, items }) {
  return (
    <div className="recommendation-list">
      <h2>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              ID Item: {item.item_id} (Fréquence: {item.frequency})
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune recommandation disponible</p>
      )}
    </div>
  );
}

export default RecommendationList;
