import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

function FinishPage() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 300, height: 300 });
  const finalScore = localStorage.getItem("finalScore") || 0;

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handlePlayAgain = () => {
    navigate("/game");
  };

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="page-container">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <h1>🎉 Congratulations! 🎉</h1>
      <h2>Your final score: {finalScore}</h2>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button onClick={handlePlayAgain}>Play Again</button>
        <button onClick={handleLeaderboard}>Leaderboard</button> {/* <-- THIS BUTTON */}
      </div>
    </div>
  );
}

export default FinishPage;
