import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Save,
  Moon,
  Sun
} from 'lucide-react';
import Toast, { ToastMessage } from '../components/Toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Form states
  const [profileData, setProfileData] = useState({
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    company: 'SaaS Pro Inc.',
    role: 'Amministratore'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    marketingEmails: false
  });

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Profilo aggiornato con successo');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Preferenze di notifica salvate');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    addToast('info', `Tema ${!isDarkMode ? 'scuro' : 'chiaro'} attivato`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="page-header">
        <div>
          <h1 className="page-title">Impostazioni</h1>
          <p className="page-description">Gestisci il tuo account e le preferenze dell'applicazione.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Settings */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-1">
            <button 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'profile' ? 'bg-accent/10 text-accent' : 'text-secondary hover:bg-bg-surface-hover hover:text-primary'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profilo
            </button>
            <button 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'notifications' ? 'bg-accent/10 text-accent' : 'text-secondary hover:bg-bg-surface-hover hover:text-primary'
              }`}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Notifiche
            </button>
            <button 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'appearance' ? 'bg-accent/10 text-accent' : 'text-secondary hover:bg-bg-surface-hover hover:text-primary'
              }`}
              onClick={() => setActiveTab('appearance')}
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />} Aspetto
            </button>
            <button 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'security' ? 'bg-accent/10 text-accent' : 'text-secondary hover:bg-bg-surface-hover hover:text-primary'
              }`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} /> Sicurezza
            </button>
            <button 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'billing' ? 'bg-accent/10 text-accent' : 'text-secondary hover:bg-bg-surface-hover hover:text-primary'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              <CreditCard size={18} /> Fatturazione
            </button>
          </nav>
        </div>

        {/* Content Settings */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold mb-6">Informazioni Profilo</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-accent/20 text-accent flex items-center justify-center text-3xl font-bold">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <button type="button" className="btn btn-outline mb-2">Cambia Foto</button>
                    <p className="text-sm text-muted">JPG, GIF o PNG. Max 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      className="input w-full"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="input w-full"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Azienda</label>
                    <input 
                      type="text" 
                      className="input w-full"
                      value={profileData.company}
                      onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Ruolo</label>
                    <input 
                      type="text" 
                      className="input w-full"
                      value={profileData.role}
                      disabled
                      className="input w-full bg-bg-surface-hover cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border-color flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    <Save size={18} />
                    Salva Modifiche
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold mb-6">Preferenze Notifiche</h2>
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifiche Email</h3>
                      <p className="text-sm text-secondary">Ricevi un'email per ogni nuovo appuntamento o cliente.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications.emailAlerts}
                        onChange={(e) => setNotifications({...notifications, emailAlerts: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifiche Push</h3>
                      <p className="text-sm text-secondary">Ricevi notifiche in tempo reale nel browser.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications.pushNotifications}
                        onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Marketing</h3>
                      <p className="text-sm text-secondary">Ricevi aggiornamenti su nuove funzionalità e offerte.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications.marketingEmails}
                        onChange={(e) => setNotifications({...notifications, marketingEmails: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-color flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    <Save size={18} />
                    Salva Preferenze
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card animate-in fade-in duration-300">
              <h2 className="text-xl font-semibold mb-6">Aspetto</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-bg-surface-hover rounded-lg">
                      {isDarkMode ? <Moon size={24} className="text-accent" /> : <Sun size={24} className="text-accent" />}
                    </div>
                    <div>
                      <h3 className="font-medium">Tema dell'applicazione</h3>
                      <p className="text-sm text-secondary">Scegli tra tema chiaro e scuro.</p>
                    </div>
                  </div>
                  <button 
                    className="btn btn-outline"
                    onClick={toggleTheme}
                  >
                    Passa al tema {isDarkMode ? 'Chiaro' : 'Scuro'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'billing') && (
            <div className="empty-state animate-in fade-in duration-300">
              <div className="empty-state-icon">
                {activeTab === 'security' ? <Shield size={32} /> : <CreditCard size={32} />}
              </div>
              <h3 className="empty-state-title">
                {activeTab === 'security' ? 'Sicurezza Account' : 'Fatturazione'}
              </h3>
              <p className="empty-state-desc">
                Questa sezione richiede la configurazione del backend reale. 
                Nella modalità demo queste impostazioni non sono disponibili.
              </p>
              <button className="btn btn-primary mt-4" onClick={() => setActiveTab('profile')}>
                Torna al Profilo
              </button>
            </div>
          )}
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Settings;