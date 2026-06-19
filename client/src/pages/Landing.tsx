import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Calendar, 
  Shield,
  Zap
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-base text-primary font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-md border-b border-border-color z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-accent">
          <Activity size={28} />
          <span className="text-xl font-bold text-primary">SaaS Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Funzionalità</button>
          <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors">Come funziona</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Prezzi</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/app')}
            className="text-sm font-medium hover:text-accent transition-colors hidden md:block"
          >
            Accedi
          </button>
          <button 
            onClick={() => navigate('/app')}
            className="btn btn-primary"
          >
            Inizia Gratis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
          <Zap size={16} />
          <span>La nuova versione 2.0 è online</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          Gestisci il tuo business con <span className="text-accent">semplicità</span>
        </h1>
        <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto">
          La piattaforma all-in-one per professionisti e piccole imprese. 
          Clienti, appuntamenti, fatture e analisi in un unico posto.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/app')}
            className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto"
          >
            Apri la Dashboard
            <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="btn btn-outline text-lg px-8 py-4 w-full sm:w-auto"
          >
            Scopri di più
          </button>
        </div>
        
        {/* Hero Image Mockup */}
        <div className="mt-16 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent z-10"></div>
          <div className="rounded-xl border border-border-color bg-surface shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
            <div className="text-center p-8">
              <Activity size={64} className="mx-auto text-accent/50 mb-4" />
              <p className="text-2xl font-semibold text-secondary">Anteprima Dashboard</p>
              <p className="text-muted mt-2">Clicca su "Apri la Dashboard" per esplorare la demo interattiva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tutto ciò che ti serve</h2>
            <p className="text-secondary max-w-2xl mx-auto">Strumenti potenti progettati per farti risparmiare tempo e far crescere la tua attività.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { icon: <Users size={24} />, title: 'Gestione Clienti', desc: 'CRM completo per tracciare ogni interazione e dato dei tuoi clienti.' },
              { icon: <Calendar size={24} />, title: 'Appuntamenti', desc: 'Calendario intelligente con promemoria automatici e prenotazioni online.' },
              { icon: <BarChart3 size={24} />, title: 'Analisi Avanzate', desc: 'Report dettagliati su fatturato, conversioni e performance del team.' },
              { icon: <Shield size={24} />, title: 'Sicurezza Dati', desc: 'I tuoi dati sono criptati e salvati su server sicuri con backup giornalieri.' },
              { icon: <Zap size={24} />, title: 'Automazioni', desc: 'Riduci il lavoro manuale automatizzando task ripetitivi e comunicazioni.' },
              { icon: <CheckCircle2 size={24} />, title: 'Fatturazione', desc: 'Crea e invia fatture professionali in pochi clic, traccia i pagamenti.' }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-border-color bg-base hover:border-accent/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Piani semplici e trasparenti</h2>
            <p className="text-secondary max-w-2xl mx-auto">Scegli il piano perfetto per le tue esigenze. Nessun costo nascosto.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="p-8 rounded-2xl border border-border-color bg-surface">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-secondary mb-6">Per professionisti indipendenti.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">€0</span>
                <span className="text-secondary">/mese</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Fino a 50 clienti', 'Calendario base', 'Supporto email', 'Analisi standard'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/app')} className="btn btn-outline w-full py-3">
                Inizia Gratis
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl border-2 border-accent bg-surface relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                Più Popolare
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-secondary mb-6">Per team e piccole imprese.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">€29</span>
                <span className="text-secondary">/mese</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Clienti illimitati', 'Calendario avanzato', 'Fatturazione integrata', 'Analisi personalizzate', 'Supporto prioritario'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/app')} className="btn btn-primary w-full py-3">
                Prova Pro per 14 giorni
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border-color bg-surface text-center">
        <div className="flex items-center justify-center gap-2 text-accent mb-4">
          <Activity size={24} />
          <span className="text-lg font-bold text-primary">SaaS Pro</span>
        </div>
        <p className="text-secondary text-sm">
          © {new Date().getFullYear()} SaaS Pro. Tutti i diritti riservati. Questa è una demo.
        </p>
      </footer>
    </div>
  );
};

export default Landing;