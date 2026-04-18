import { useState } from "react";

export default function GamePage() {
  const [players, setPlayers] = useState([40, 40, 40, 40]);

  const changeLife = (index, amount) => {
    const newPlayers = [...players];
    newPlayers[index] += amount;
    setPlayers(newPlayers);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Commander Game</h1>

      {players.map((life, index) => (
        <div key={index} style={{ margin: "20px" }}>
          <h2>Jugador {index + 1}</h2>
          <h1>{life}</h1>

          <button onClick={() => changeLife(index, 1)}>+1</button>
          <button onClick={() => changeLife(index, -1)}>-1</button>
        </div>
      ))}
    </div>
  );
}