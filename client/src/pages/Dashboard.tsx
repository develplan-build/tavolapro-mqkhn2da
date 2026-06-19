import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Gen', revenue: 4000, clients: 24 },
  { name: 'Feb', revenue: 3000, clients: 18 },
  { name: 'Mar', revenue: 5000, clients: 35 },
  { name: 'Apr', revenue: 4500, clients: 28 },
  { name: 'Mag', revenue: 6000, clients: 42 },
  { name: 'Giu', revenue: 5500, clients: 38 },
  { name: 'Lug', revenue: 7000, clients: 50 },
];

const recentActivities = [
  { id: 1, user: 'Marco Rossi', action: 'ha prenotato un appuntamento', time: '2 ore fa', status: 'success' },
  { id: 2, user: 'Giulia Bianchi', action: 'ha pagato la fattura #1024', time: '4 ore fa', status: 'success' },
  { id: 3, user: 'Sistema', action: 'Backup settimanale completato', time: '1 giorno fa', status: 'info' },
  { id: 4, user: 'Luca Verdi', action: 'ha cancellato l\'appuntamento', time: '1 giorno fa', status: 'warning' },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Benvenuto! Ecco un riepilogo delle tue attività.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="input py-2"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
            <option value="90d">Ultimi 3 mesi</option>
            <option value="1y">Ultimo anno</option>
          </select>
          <button className="btn btn-primary">
            Scarica Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Fatturato Totale"
          value="€ 24.500"
          trend="+12.5%"
          isPositive={true}
          icon={<TrendingUp size={24} />}
        />
        <KpiCard 
          title="Nuovi Clienti"
          value="142"
          trend="+8.2%"
          isPositive={true}
          icon={<Users size={24} />}
        />
        <KpiCard 
          title="Appuntamenti"
          value="38"
          trend="-2.4%"
          isPositive={false}
          icon={<Calendar size={24} />}
        />
        <KpiCard 
          title="Fatture in Sospeso"
          value="€ 3.200"
          trend="+5.1%"
          isPositive={false}
          icon={<CreditCard size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Andamento Fatturato</h2>
            <button className="text-muted hover:text-primary">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Attività Recenti</h2>
            <button className="text-accent text-sm font-medium hover:underline">
              Vedi tutte
            </button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-success' : 
                  activity.status === 'warning' ? 'bg-warning' : 'bg-info'
                }`} />
                <div>
                  <p className="text-sm">
                    <span className="font-medium text-primary">{activity.user}</span>{' '}
                    <span className="text-secondary">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, trend, isPositive, icon }) => {
  return (
    <div className="card flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
          isPositive ? 'text-success bg-success/10' : 'text-danger bg-danger/10'
        }`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
      <h3 className="text-secondary text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
};

export default Dashboard;