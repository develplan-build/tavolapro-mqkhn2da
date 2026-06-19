import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Search, 
  File, 
  Image as ImageIcon,
  MoreVertical
} from 'lucide-react';
import Toast, { ToastMessage } from '../components/Toast';

const initialDocuments = [
  { id: '1', name: 'Contratto_Rossi_2023.pdf', type: 'pdf', size: '2.4 MB', date: '15 Ott 2023', author: 'Marco Rossi' },
  { id: '2', name: 'Fattura_1024.pdf', type: 'pdf', size: '1.1 MB', date: '12 Ott 2023', author: 'Sistema' },
  { id: '3', name: 'Logo_Azienda.png', type: 'image', size: '4.5 MB', date: '10 Ott 2023', author: 'Marco Rossi' },
  { id: '4', name: 'Report_Q3.xlsx', type: 'excel', size: '850 KB', date: '01 Ott 2023', author: 'Marco Rossi' },
];

const Documents = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleUpload = () => {
    // Simulate file upload
    const newDoc = {
      id: Math.random().toString(36).substring(2, 9),
      name: `Nuovo_Documento_${Math.floor(Math.random() * 100)}.pdf`,
      type: 'pdf',
      size: '1.5 MB',
      date: 'Oggi',
      author: 'Marco Rossi'
    };
    setDocuments([newDoc, ...documents]);
    addToast('success', 'Documento caricato con successo');
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    addToast('info', 'Documento eliminato');
  };

  const handleDownload = (name: string) => {
    addToast('success', `Download di ${name} avviato`);
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="text-danger" size={24} />;
      case 'image': return <ImageIcon className="text-info" size={24} />;
      default: return <File className="text-success" size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Documenti</h1>
          <p className="page-description">Gestisci i tuoi file, contratti e fatture.</p>
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>
          <Upload size={20} />
          Carica File
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-color flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cerca documento..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nome File</th>
                <th>Dimensione</th>
                <th>Data Caricamento</th>
                <th>Autore</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-bg-surface-hover rounded-lg">
                          {getIcon(doc.type)}
                        </div>
                        <span className="font-medium text-primary">{doc.name}</span>
                      </div>
                    </td>
                    <td className="text-secondary">{doc.size}</td>
                    <td className="text-secondary">{doc.date}</td>
                    <td className="text-secondary">{doc.author}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="btn-icon text-secondary hover:text-primary"
                          onClick={() => handleDownload(doc.name)}
                        >
                          <Download size={18} />
                        </button>
                        <button 
                          className="btn-icon text-secondary hover:text-danger"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-secondary">
                      <FileText size={48} className="mb-4 text-muted" />
                      <p>Nessun documento trovato.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Documents;