import React, { useEffect, useState } from 'react';
import customAPI from '../api';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await customAPI.get('/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Data Pemain</h1>
        <div className="grid gap-4">
          {players.map((player) => (
            <div key={player._id} className="glass-card rounded-xl p-6 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                  <p className="text-sm text-gray-400">{player.role}</p>
                </div>
                <span className="text-tombol font-bold">{player.winRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerList;
