import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import FinishPage from "./components/FinishPage";  // <-- add this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/game" element={<Game />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/finish" element={<FinishPage />} /> {/* <-- add this */}
    </Routes>
  );
}

export default App;
