import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { HAS_BACKEND } from '../config';
import { AlertCircle, X } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(!HAS_BACKEND);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="main-content">
        {showDemoBanner && (
          <div className="demo-banner">
            <AlertCircle size={16} />
            <span>Modalità demo - i dati sono locali. Scarica il codice e segui il README per attivare backend e database reali.</span>
            <button 
              onClick={() => setShowDemoBanner(false)}
              className="ml-auto text-warning hover:text-warning-dark"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="page-container">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;