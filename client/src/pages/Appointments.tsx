import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  User,
  X
} from 'lucide-react';
import Toast, { ToastMessage } from '../components/Toast';

const initialAppointments = [
  { id: '1', title: 'Consulenza Iniziale', client: 'Mario Rossi', date: 'Oggi', time: '10:00 - 11:00', type: 'Video', status: 'Confermato' },
  { id: '2', title: 'Revisione Progetto', client: 'Laura Bianchi', date: 'Oggi', time: '14:30 - 15:30', type: 'In presenza', status: 'Confermato' },
  { id: '3', title: 'Chiamata Conoscitiva', client: 'Marco Colombo', date: 'Domani', time: '09:00 - 09:30', type: 'Telefono', status: 'In attesa' },
  { id: '4', title: 'Presentazione Preventivo', client: 'Anna Neri', date: 'Domani', time: '16:00 - 17:00', type: 'Video', status: 'Confermato' },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [formData, setFormData] = useState({ title: '', client: '', date: '', time: '', type: 'Video' });

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client) {
      addToast('error', 'Compila i campi obbligatori');
      return;
    }
    
    const newAppointment = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      status: 'Confermato'
    };
    
    setAppointments([newAppointment, ...appointments]);
    setIsModalOpen(false);
    setFormData({ title: '', client: '', date: '', time: '', type: 'Video' });
    addToast('success', 'Appuntamento fissato con successo');
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Appuntamenti</h1>
          <p className="page-description">Gestisci il tuo calendario e le prenotazioni.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Nuovo Appuntamento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mini Calendar & Filters */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Ottobre 2023</h3>
              <div className="flex gap-1">
                <button className="btn-icon"><ChevronLeft size={18} /></button>
                <button className="btn-icon"><ChevronRight size={18} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              <div className="text-muted font-medium">Lu</div>
              <div className="text-muted font-medium">Ma</div>
              <div className="text-muted font-medium">Me</div>
              <div className="text-muted font-medium">Gi</div>
              <div className="text-muted font-medium">Ve</div>
              <div className="text-muted font-medium">Sa</div>
              <div className="text-muted font-medium">Do</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {/* Dummy calendar days */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded-md cursor-pointer hover:bg-bg-surface-hover ${
                    i === 14 ? 'bg-accent text-white font-bold hover:bg-accent' : ''
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Filtri</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border-color text-accent focus:ring-accent" defaultChecked />
                <span className="text-sm">Tutti gli appuntamenti</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border-color text-accent focus:ring-accent" defaultChecked />
                <span className="text-sm">Video Call</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border-color text-accent focus:ring-accent" defaultChecked />
                <span className="text-sm">In presenza</span>
              </label>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Prossimi Appuntamenti</h2>
            <div className="flex bg-surface border border-border-color rounded-lg p-1">
              <button className="px-3 py-1 text-sm font-medium rounded-md bg-bg-elevated shadow-sm">Lista</button>
              <button className="px-3 py-1 text-sm font-medium rounded-md text-secondary hover:text-primary">Giorno</button>
              <button className="px-3 py-1 text-sm font-medium rounded-md text-secondary hover:text-primary">Settimana</button>
            </div>
          </div>

          {appointments.map((apt) => (
            <div key={apt.id} className="card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-accent/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center bg-accent/10 text-accent rounded-lg p-3 min-w-[80px]">
                <span className="text-xs font-semibold uppercase">{apt.date}</span>
                <span className="text-lg font-bold">{apt.time.split(' ')[0]}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{apt.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-secondary">
                  <div className="flex items-center gap-1">
                    <User size={14} /> {apt.client}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} /> {apt.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={14} /> {apt.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className={`badge ${
                  apt.status === 'Confermato' ? 'badge-success' : 'badge-warning'
                }`}>
                  {apt.status}
                </span>
                <button className="btn btn-outline py-1 px-3 text-sm">
                  Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Nuovo Appuntamento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border-color">
              <h2 className="text-xl font-semibold">Nuovo Appuntamento</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-primary"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Titolo *</label>
                <input 
                  type="text" 
                  className="input w-full"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Es. Consulenza iniziale"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cliente *</label>
                <input 
                  type="text" 
                  className="input w-full"
                  value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  placeholder="Nome cliente"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data</label>
                  <input 
                    type="date" 
                    className="input w-full"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ora</label>
                  <input 
                    type="time" 
                    className="input w-full"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select 
                  className="input w-full"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Video">Video Call</option>
                  <option value="In presenza">In presenza</option>
                  <option value="Telefono">Telefono</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Annulla
                </button>
                <button type="submit" className="btn btn-primary">
                  Salva Appuntamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Appointments;