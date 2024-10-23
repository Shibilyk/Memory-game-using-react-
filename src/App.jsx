import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const icons = [
  "🎶",
  "⛷️",
  "💖",
  "🤦‍♀️",
  "😎",
  "🦋",
  "🐦‍🔥",
  "🪼",
  "🫀",
  "👮‍♂️",
  "🛳️",
  "👜",
];

function App() {
  const [pieces, setPieces] = useState([]);
  const gameCompleted = useMemo(() => {
    if (pieces.length > 0 && pieces.every((piec) => piec.solved)) {
      return true;
    }
    return false;
  }, [pieces]);
  const startGame = () => {
    const duplicateIcons = [...icons, ...icons];
    const newGameIcons = [];
    while (newGameIcons.length < icons.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateIcons.length);
      newGameIcons.push({
        icon: duplicateIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateIcons.splice(randomIndex, 1);
    }
    setPieces(newGameIcons);
  };
  useEffect(() => {
    startGame();
  }, []);
  const handleActive = (data) => {
    const flippedData = pieces.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) return;
    const newPieces = pieces.map((piece) => {
      if (piece.position === data.position) {
        piece.flipped = !piece.flipped;
      }
      return piece;
    });
    setPieces(newPieces);
  };
  const gameLogic = () => {
    const flippedData = pieces.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) {
      setTimeout(() => {
        setPieces(
          pieces.map((piec) => {
            if (flippedData[0].icon === flippedData[1].icon) {
              if (
                piec.position === flippedData[0].position ||
                piec.position === flippedData[1].position
              ) {
                piec.solved = true;
              }
              return piec;
            } else {
              if (
                piec.position === flippedData[0].position ||
                piec.position === flippedData[1].position
              ) {
                piec.flipped = false;
              }
              return piec;
            }
          })
        );
      }, 800);
    }
  };
  useEffect(() => {
    gameLogic();
  }, [pieces]);

  return (
    <main>
      <h1>Momory Game</h1>
      <div className="container">
        {pieces.map((data, index) => (
          <div
            className={`flip-card ${data.flipped ? "active" : ""}`}
            key={index}
            onClick={() => handleActive(data)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front"></div>
              <div className="flip-card-back">{data.icon}</div>
            </div>
          </div>
        ))}
      </div>
      {gameCompleted && (
        <div className="game-completed">
          <h1>YOU WIN !!!</h1>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </main>
  );
}

export default App;
