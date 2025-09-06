import React, { useState, useCallback } from 'react';
import { UseMultiplayerReturn } from '../hooks/useMultiplayer';

interface LobbyScreenProps {
  multiPlayerState: UseMultiplayerReturn;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ multiPlayerState }) => {
  const { createRoom, joinRoom, error } = multiPlayerState;
  const [playerName, setPlayerName] = useState('Игрок 1');
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = useCallback(() => {
    if (playerName.trim()) {
      createRoom(playerName.trim());
    }
  }, [playerName, createRoom]);

  const handleJoinRoom = useCallback(() => {
    if (playerName.trim() && roomId.trim()) {
      joinRoom(roomId.trim().toUpperCase(), playerName.trim());
    }
  }, [playerName, roomId, joinRoom]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="text-center mb-10">
        <h1 className="font-bebas text-8xl text-slate-200 tracking-wider"
          style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.1), 0 0 20px rgba(76, 156, 255, 0.4)' }}>
          Metal Empire
        </h1>
        <p className="text-xl text-slate-400 font-light tracking-wide">Постройте свою металлургическую империю</p>
      </div>

      <div className="w-full max-w-md bg-slate-900/50 rounded-lg shadow-2xl p-8 border border-slate-700 backdrop-blur-sm">
        <h2 className="font-bebas text-3xl text-center mb-6 text-slate-300 tracking-wide">Сетевая игра</h2>

        <div className="space-y-4 mb-6">
           <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Ваше имя"
            />
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="ID Комнаты (для подключения)"
            />
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="space-y-3">
            <button
              onClick={handleCreateRoom}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bebas text-2xl tracking-wider py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              Создать комнату
            </button>
            <button
              onClick={handleJoinRoom}
              disabled={!roomId}
              className="w-full bg-slate-800 text-slate-300 font-bebas text-2xl tracking-wider py-3 rounded-lg border border-slate-700 hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              Присоединиться к игре
            </button>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
