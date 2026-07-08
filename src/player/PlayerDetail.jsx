import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAPI from '../api';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await customAPI.get(`/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error('Error fetching player:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <p className="text-gray-400">Player not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{player.name}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-gray-400">Role</span>
              <span className="text-white font-semibold">{player.role}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-gray-400">Win Rate</span>
              <span className="text-tombol font-bold">{player.winRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
