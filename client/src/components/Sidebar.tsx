import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Activity,
  FileText,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/app', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/app/clients', icon: <Users size={20} />, label: 'Clienti' },
    { path: '/app/appointments', icon: <Calendar size={20} />, label: 'Appuntamenti' },
    { path: '/app/analytics', icon: <Activity size={20} />, label: 'Analisi' },
    { path: '/app/documents', icon: <FileText size={20} />, label: 'Documenti' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Activity size={28} />
        </div>
        <span className="sidebar-title">SaaS Pro</span>
        <button className="md:hidden ml-auto text-secondary" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="flex flex-col gap-2">
          <NavLink 
            to="/app/settings" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => window.innerWidth < 768 && onClose()}
          >
            <Settings size={20} />
            <span>Impostazioni</span>
          </NavLink>
          <NavLink to="/" className="nav-item text-danger hover:bg-danger-bg hover:text-danger">
            <LogOut size={20} />
            <span>Esci</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;