import React, { useState } from 'react';
import { Menu, Bell, Search, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would update CSS variables or a context
    // For demo, we just toggle the state
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center bg-base border border-border-color rounded-md px-3 py-1.5 w-64">
          <Search size={16} className="text-muted mr-2" />
          <input 
            type="text" 
            placeholder="Cerca..." 
            className="bg-transparent border-none outline-none text-sm w-full text-primary"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="relative">
          <button 
            className="btn-icon text-secondary hover:text-primary relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface border border-border-color rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="p-3 border-b border-border-color flex justify-between items-center">
                <h3 className="font-semibold">Notifiche</h3>
                <button className="text-xs text-accent">Segna tutte come lette</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-border-color hover:bg-bg-surface-hover cursor-pointer">
                  <p className="text-sm font-medium">Nuovo cliente registrato</p>
                  <p className="text-xs text-muted mt-1">Marco Rossi si è appena iscritto.</p>
                  <p className="text-xs text-muted mt-1">5 min fa</p>
                </div>
                <div className="p-3 border-b border-border-color hover:bg-bg-surface-hover cursor-pointer">
                  <p className="text-sm font-medium">Fattura pagata</p>
                  <p className="text-xs text-muted mt-1">La fattura #1024 è stata saldata.</p>
                  <p className="text-xs text-muted mt-1">2 ore fa</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div 
            className="user-profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="avatar">MR</div>
            <div className="hidden md:block text-sm">
              <p className="font-medium">Marco Rossi</p>
              <p className="text-xs text-muted">Admin</p>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-border-color rounded-lg shadow-lg z-50 py-1">
              <button 
                className="w-full text-left px-4 py-2 text-sm hover:bg-bg-surface-hover flex items-center gap-2"
                onClick={() => { navigate('/app/settings'); setShowProfileMenu(false); }}
              >
                <User size={16} /> Profilo
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm hover:bg-bg-surface-hover flex items-center gap-2"
                onClick={() => { navigate('/app/settings'); setShowProfileMenu(false); }}
              >
                <Settings size={16} /> Impostazioni
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-sm hover:bg-bg-surface-hover flex items-center gap-2"
                onClick={toggleTheme}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />} 
                {isDarkMode ? 'Tema Chiaro' : 'Tema Scuro'}
              </button>
              <div className="border-t border-border-color my-1"></div>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger-bg flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;