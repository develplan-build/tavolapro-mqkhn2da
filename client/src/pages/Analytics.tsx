import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';
import Toast, { ToastMessage } from '../components/Toast';

const revenueData = [
  { name: 'Gen', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'Mag', value: 6000 },
  { name: 'Giu', value: 5500 },
];

const sourceData = [
  { name: 'Sito Web', value: 400 },
  { name: 'Passaparola', value: 300 },
  { name: 'Social Media', value: 300 },
  { name: 'Altro', value: 200 },
];

const COLORS = ['var(--accent)', '#3b82f6', '#10b981', '#f59e0b'];

const Analytics = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleExport = () => {
    addToast('success', 'Report esportato con successo in formato PDF');
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analisi e Report</h1>
          <p className="page-description">Monitora le performance del tuo business.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <Calendar size={18} />
            Ultimi 6 mesi
          </button>
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={18} />
            Esporta Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Fatturato Mensile</h2>
            <button className="btn-icon"><Filter size={18} /></button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                <Tooltip 
                  cursor={{ fill: 'var(--bg-surface-hover)' }}
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sorgente Clienti</h2>
            <button className="btn-icon"><Filter size={18} /></button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-color">
          <h2 className="text-lg font-semibold">Dettaglio Servizi</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Servizio</th>
                <th>Vendite</th>
                <th>Fatturato</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">Consulenza Premium</td>
                <td>45</td>
                <td>€ 13.500</td>
                <td className="text-success">+12%</td>
              </tr>
              <tr>
                <td className="font-medium">Pacchetto Base</td>
                <td>120</td>
                <td>€ 6.000</td>
                <td className="text-success">+5%</td>
              </tr>
              <tr>
                <td className="font-medium">Revisione Progetto</td>
                <td>30</td>
                <td>€ 4.500</td>
                <td className="text-danger">-2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default Analytics;