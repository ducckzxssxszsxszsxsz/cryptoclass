import React, { useState } from 'react';
import customAPI from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddPlayerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', role: '', winRate: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customAPI.post('/addplayer', formData);
      toast.success('Player added successfully!');
      navigate('/players');
    } catch (error) {
      toast.error('Failed to add player');
    }
  };

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Add Player</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
            />
            <input
              type="number"
              name="winRate"
              placeholder="Win Rate (%)"
              value={formData.winRate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-tombol text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
            >
              Add Player
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerForm;
