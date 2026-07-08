import React, { useState } from 'react';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [roles, setRoles] = useState({ student: false, king: false, knight: false });

  const handleRoleChange = (role) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter((role) => roles[role]);

    try {
      const response = await customAPI.post('/course/create', {
        title,
        description,
        content,
        price: coursePrice,
        roles: selectedRoles,
      });

      if (response.status === 201) {
        toast.success(response.data.message || 'Course created!');
        setTitle('');
        setDescription('');
        setContent('');
        setCoursePrice('');
        setRoles({ student: false, king: false, knight: false });
        navigate('/classview');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan!');
    }
  };

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Create Course</h2>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <input
            type="number"
            placeholder="Price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <div>
            <p className="text-sm font-medium text-gray-400 mb-3">Roles</p>
            <div className="flex flex-wrap gap-4">
              {Object.keys(roles).map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles[role]}
                    onChange={() => handleRoleChange(role)}
                    className="w-4 h-4 rounded border-gray-600 bg-white/5 text-tombol focus:ring-tombol"
                  />
                  <span className="text-white text-sm">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-tombol text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
