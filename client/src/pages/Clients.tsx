import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Mail, 
  Phone,
  X
} from 'lucide-react';
import Toast, { ToastMessage } from '../components/Toast';

// Dati demo iniziali
const initialClients = [
  { id: '1', name: 'Mario Rossi', email: 'mario.rossi@example.com', phone: '+39 333 1234567', status: 'Attivo', lastVisit: '2023-10-15' },
  { id: '2', name: 'Laura Bianchi', email: 'laura.b@example.com', phone: '+39 345 9876543', status: 'Attivo', lastVisit: '2023-10-12' },
  { id: '3', name: 'Giuseppe Verdi', email: 'g.verdi@example.com', phone: '+39 328 4567890', status: 'Inattivo', lastVisit: '2023-08-05' },
  { id: '4', name: 'Anna Neri', email: 'anna.neri@example.com', phone: '+39 331 7654321', status: 'Attivo', lastVisit: '2023-10-18' },
  { id: '5', name: 'Marco Colombo', email: 'm.colombo@example.com', phone: '+39 340 1122334', status: 'Lead', lastVisit: '-' },
];

const Clients = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Attivo' });

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast('error', 'Compila i campi obbligatori');
      return;
    }
    
    const newClient = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      lastVisit: '-'
    };
    
    setClients([newClient, ...clients]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', status: 'Attivo' });
    addToast('success', 'Cliente aggiunto con successo');
  };

  const handleDelete = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    addToast('info', 'Cliente rimosso');
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Clienti</h1>
          <p className="page-description">Gestisci la tua anagrafica clienti e i loro contatti.</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Nuovo Cliente
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-color flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cerca per nome o email..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline w-full sm:w-auto">
            <Filter size={18} />
            Filtri
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contatti</th>
                <th>Stato</th>
                <th>Ultima Visita</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="font-medium text-primary">{client.name}</div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-secondary">
                          <Mail size={14} /> {client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-secondary">
                          <Phone size={14} /> {client.phone}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        client.status === 'Attivo' ? 'badge-success' : 
                        client.status === 'Inattivo' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="text-secondary">{client.lastVisit}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn-icon text-secondary hover:text-primary">
                          <Edit size={18} />
                        </button>
                        <button 
                          className="btn-icon text-secondary hover:text-danger"
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-secondary">
                    Nessun cliente trovato.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nuovo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border-color">
              <h2 className="text-xl font-semibold">Aggiungi Cliente</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-muted hover:text-primary"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo *</label>
                <input 
                  type="text" 
                  className="input w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input 
                  type="email" 
                  className="input w-full"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefono</label>
                <input 
                  type="tel" 
                  className="input w-full"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stato</label>
                <select 
                  className="input w-full"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Attivo">Attivo</option>
                  <option value="Lead">Lead</option>
                  <option value="Inattivo">Inattivo</option>
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
                  Salva Cliente
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

export default Clients;