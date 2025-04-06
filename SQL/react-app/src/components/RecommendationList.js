import React from 'react';

function RecommendationList({ title, items }) {
  return (
    <div className="recommendation-list">
      <h2>{title}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              Item ID: {item.item_id} (Frequency: {item.frequency})
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
}

export default RecommendationList;
