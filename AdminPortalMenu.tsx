import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminPortalMenuProps {
  onClose: () => void;
}

const AdminPortalMenu: React.FC<AdminPortalMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    onClose();
  };

  return (
    <div className="mb-6">
      <h3 className="text-teal-400 font-semibold mb-3 text-sm uppercase tracking-wide">Admin Access</h3>
      <button
        onClick={() => handleNavigation('/ffm-admin')}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg transition-all duration-300 font-semibold hover:from-purple-600 hover:to-purple-700"
      >
        ⚙️ FFM Admin Portal
      </button>
    </div>
  );
};

export default AdminPortalMenu;