import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const UserIcon = ({ onClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admindashboard');
          break;
        case 'manager':
          navigate('/manager');
          break;
        case 'user':
          navigate('/user');
          break;
        default:
          navigate('/');
          break;
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-2xl text-gray-400 hover:text-tombol transition-colors duration-200"
      title="Profile"
    >
      <FaUserCircle />
    </button>
  );
};

export default UserIcon;
