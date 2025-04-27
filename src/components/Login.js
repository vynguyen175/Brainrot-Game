import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      alert("Please enter your username!");
      return;
    }

    localStorage.setItem("username", username);  
    navigate("/game");                            
  };

  return (
    <div className="page-container">
      <h1>Brainrot Game 🎯</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Enter your username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default Login;
