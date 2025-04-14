import React, { useState } from 'react';
import './App.css';
import ItemSearch from './components/ItemSearch';
import RecommendationList from './components/RecommendationList';

function App() {
  const [viewedRecommendations, setViewedRecommendations] = useState([]);
  const [purchasedRecommendations, setPurchasedRecommendations] = useState([]);
  const [combinedRecommendations, setCombinedRecommendations] = useState([]);

  const fetchRecommendations = async (itemId) => {
    try {
      const [viewedRes, purchasedRes, combinedRes] = await Promise.all([
        fetch(`http://localhost:5000/recommendations/viewed/${itemId}`),
        fetch(`http://localhost:5000/recommendations/purchased/${itemId}`),
        fetch(`http://localhost:5000/recommendations/combined/${itemId}`)
      ]);

      const viewedData = await viewedRes.json();
      const purchasedData = await purchasedRes.json();
      const combinedData = await combinedRes.json();

      setViewedRecommendations(viewedData);
      setPurchasedRecommendations(purchasedData);
      setCombinedRecommendations(combinedData);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <h1>Tableau de bord des recommandations de produits</h1>
      <ItemSearch onSearch={fetchRecommendations} />
      <div className="recommendations-container">
        <RecommendationList 
          title="Recommandations par Views"
          items={viewedRecommendations}
        />
        <RecommendationList 
          title="Recommendations par achats"
          items={purchasedRecommendations}
        />
        <RecommendationList 
          title="Recommendations Combinées"
          items={combinedRecommendations}
        />
      </div>
    </div>
  );
}

export default App;