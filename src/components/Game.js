import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  { name: "Ballerina Capuchina", src: "/brainrots/balerina.webp" },
  { name: "Bombombini Gusini", src: "/brainrots/bombigini.webp" },
  { name: "Brr Brr Patapim", src: "/brainrots/brbr.webp" },
  { name: "Chimpanzini Bananini", src: "/brainrots/chimpanzee.webp" },
  { name: "Bombardiro Crocodilo", src: "/brainrots/crocodilo.jpg" },
  { name: "Lirilì Larilà", src: "/brainrots/liri.webp" },
  { name: "Tralalero Tralala", src: "/brainrots/tralalero.jpg" },
  { name: "Trippi Troppi", src: "/brainrots/trippi.webp" },
  { name: "Tung Tung Tung Sahur", src: "/brainrots/tungsahur.png" },
];

function Game() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, []);

  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selected) => {
    if (isFinished) return;

    const correct = shuffledImages[currentIndex];

    if (selected.name === correct.name) {
      alert("Correct! 🎉");
      setScore((prev) => prev + 1);
    } else {
      alert("Wrong! ❌");
    }

    if (currentIndex + 1 < shuffledImages.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      setTimeout(() => {
        finishGame();
      }, 1000); 
    }
  };

  const finishGame = async () => {
    const username = localStorage.getItem("username");

    if (!username) {
      navigate("/");
      return;
    }

    try {
      await fetch("http://127.0.0.1:5000/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score }),
      });
      

      localStorage.setItem("finalScore", score);
      navigate("/finish");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  if (shuffledImages.length === 0) return <div className="page-container">Loading...</div>;

  if (isFinished) {
    return (
      <div className="page-container">
        <h1>🎉 Well Done! 🎉</h1>
        <p>Preparing your final score...</p>
      </div>
    );
  }

  const currentImage = shuffledImages[currentIndex];

  const options = shuffleArray([
    currentImage,
    ...shuffleArray(images.filter((img) => img.name !== currentImage.name)).slice(0, 3),
  ]);

  return (
    <div className="page-container">
      <h2>Score: {score}</h2>
      <img src={currentImage.src} alt="Guess me" />
      <div className="choices-grid">
        {options.map((option, idx) => (
          <button
            key={idx}
            className="choice-btn"
            onClick={() => handleAnswer(option)}
            disabled={isFinished}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
