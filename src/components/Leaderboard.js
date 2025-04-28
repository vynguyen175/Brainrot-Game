import { useEffect, useState } from "react";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/scores")
      .then(res => res.json())
      .then(data => setScores(data))
      .catch(err => console.error("Failed to fetch scores", err));
  }, []);

  return (
    <div className="page-container">
      <h1>🏆 Leaderboard 🏆</h1>
      <ul className="leaderboard-list">
        {scores.map((score, idx) => (
          <li key={idx}>
            <span>{score.username}</span>
            <span>{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
