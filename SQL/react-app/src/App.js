import React, { useState } from 'react';
import './App.css';
import ItemSearch from './components/ItemSearch';
import RecommendationList from './components/RecommendationList';

function App() {
  const [viewedRecommendations, setViewedRecommendations] = useState([]);
  const [purchasedRecommendations, setPurchasedRecommendations] = useState([]);

  const fetchRecommendations = async (itemId) => {
    try {
      const [viewedRes, purchasedRes] = await Promise.all([
        fetch(`http://localhost:5000/recommendations/viewed/${itemId}`),
        fetch(`http://localhost:5000/recommendations/purchased/${itemId}`)
      ]);

      const viewedData = await viewedRes.json();
      const purchasedData = await purchasedRes.json();

      setViewedRecommendations(viewedData);
      setPurchasedRecommendations(purchasedData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <h1>Product Recommendation Dashboard</h1>
      <ItemSearch onSearch={fetchRecommendations} />
      <div className="recommendations-container">
        <RecommendationList 
          title="Recommendations from Views"
          items={viewedRecommendations}
        />
        <RecommendationList 
          title="Recommendations from Purchases"
          items={purchasedRecommendations}
        />
      </div>
    </div>
  );
}

export default App;