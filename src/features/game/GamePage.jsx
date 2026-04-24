import { useState } from "react";
import { useGameState } from "./hooks/useGameState";

export default function GamePage() {
  const {
    gameState,
    savedGames,
    isDarkMode,
    toggleDarkMode,
    startGame,
    saveGame,
    loadGame,
    deleteSavedGame,
    updatePlayerLife,
    updatePlayerName,
    resetGame,
  } = useGameState();

  const [numPlayers, setNumPlayers] = useState(4);
  const [startingLife, setStartingLife] = useState(40);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [saveName, setSaveName] = useState("");

  const handleSave = () => {
    if (saveName.trim()) {
      saveGame(saveName.trim());
      setIsSaving(false);
      setSaveName("");
    }
  };

  if (!gameState) {
    const savedGamesList = Object.keys(savedGames);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold tracking-tight">Commander</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nueva Partida</label>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs mb-1">Número de Jugadores</label>
                  <div className="flex gap-4">
                    {[3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => setNumPlayers(num)}
                        className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                          numPlayers === num
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs mb-1">Vida Inicial</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="20"
                      max="40"
                      step="10"
                      value={startingLife}
                      onChange={(e) => setStartingLife(Number(e.target.value))}
                      className="flex-1 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-2xl font-bold w-12 text-center">{startingLife}</span>
                  </div>
                </div>

                <button
                  onClick={() => startGame(numPlayers, startingLife)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Empezar
                </button>
              </div>
            </div>

            {savedGamesList.length > 0 && (
              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                <label className="block text-sm font-medium mb-4 uppercase tracking-wider text-gray-500 dark:text-gray-400">Cargar Partida</label>
                <div className="space-y-3">
                  {savedGamesList.map(name => (
                    <div key={name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col flex-1 truncate mr-2">
                        <span className="font-bold text-sm truncate">{name}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          {new Date(savedGames[name].savedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => loadGame(name)}
                          className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors"
                          title="Cargar"
                        >
                          Cargar
                        </button>
                        <button
                          onClick={() => deleteSavedGame(name)}
                          className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  const savedGamesList = Object.keys(savedGames);
  const isThreePlayers = gameState.numPlayers === 3;
  const gridClasses = isThreePlayers 
    ? "grid-cols-1 md:grid-cols-3" 
    : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300 overflow-hidden h-screen relative">
      
      {/* Modal de Guardado */}
      {isSaving && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-xs space-y-4 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold">Guardar Partida</h2>
            <input
              autoFocus
              type="text"
              placeholder="Nombre de la partida..."
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsSaving(false)}
                className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={!saveName.trim()}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-bold transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Carga (dentro de partida) */}
      {isLoadingList && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md space-y-4 animate-in fade-in zoom-in duration-200 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Cargar Partida</h2>
              <button onClick={() => setIsLoadingList(false)} className="text-2xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {savedGamesList.length > 0 ? (
                savedGamesList.map(name => (
                  <div key={name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <div className="font-bold text-sm">{name}</div>
                      <div className="text-[10px] text-gray-500">{new Date(savedGames[name].savedAt).toLocaleDateString()}</div>
                    </div>
                    <button
                      onClick={() => {
                        loadGame(name);
                        setIsLoadingList(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg"
                    >
                      Cargar
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">No hay partidas guardadas</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm p-3 flex justify-between items-center z-10 sticky top-0">
        <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
          MTG Counter
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsSaving(true)}
            className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-xs sm:text-sm"
          >
            Guardar
          </button>
          <button
            onClick={() => setIsLoadingList(true)}
            className="px-3 sm:px-4 py-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 font-bold rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-xs sm:text-sm"
          >
            Cargar
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={resetGame}
            className="px-3 sm:px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-xs sm:text-sm"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Players Grid */}
      <div className={`flex-1 grid ${gridClasses} gap-2 sm:gap-4 p-2 sm:p-4 auto-rows-fr`}>
        {gameState.players.map((player, index) => {
          const colors = [
            "from-red-50 to-red-100 dark:from-red-950 dark:to-red-900",
            "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
            "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
            "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900"
          ];
          const bgGradient = colors[index % colors.length];

          return (
            <div 
              key={player.id} 
              className={`relative rounded-3xl shadow-md border border-black/5 dark:border-white/5 bg-gradient-to-br ${bgGradient} flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-500`}
            >
              <input
                type="text"
                value={player.name}
                onChange={(e) => updatePlayerName(index, e.target.value)}
                className="absolute top-4 sm:top-6 text-center bg-transparent border-b-2 border-transparent hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400 outline-none text-xl sm:text-2xl font-bold w-3/4 pb-1 transition-colors"
              />

              <div className="flex items-center justify-center w-full mt-4 sm:mt-8 gap-2 sm:gap-6 flex-1">
                <div className="flex flex-col gap-2 sm:gap-4">
                  <button 
                    onClick={() => updatePlayerLife(index, -5)}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 flex items-center justify-center text-xl sm:text-2xl font-black shadow-sm active:scale-95 transition-all text-red-600 dark:text-red-400 backdrop-blur-sm"
                  >
                    -5
                  </button>
                  <button 
                    onClick={() => updatePlayerLife(index, -1)}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-sm active:scale-95 transition-all text-red-500 dark:text-red-300 backdrop-blur-sm"
                  >
                    -
                  </button>
                </div>

                <div className="text-[5rem] sm:text-[8rem] font-black leading-none tabular-nums tracking-tighter drop-shadow-sm flex-1 text-center select-none">
                  {player.life}
                </div>

                <div className="flex flex-col gap-2 sm:gap-4">
                  <button 
                    onClick={() => updatePlayerLife(index, 5)}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 flex items-center justify-center text-xl sm:text-2xl font-black shadow-sm active:scale-95 transition-all text-green-600 dark:text-green-400 backdrop-blur-sm"
                  >
                    +5
                  </button>
                  <button 
                    onClick={() => updatePlayerLife(index, 1)}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-sm active:scale-95 transition-all text-green-500 dark:text-green-300 backdrop-blur-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

