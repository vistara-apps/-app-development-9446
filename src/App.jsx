import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { HabitManager } from './components/HabitManager';
import { Settings } from './components/Settings';
import { useNotifications } from './hooks/useNotifications';
import { WellnessProvider } from './context/WellnessContext';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <WellnessProvider>
      <div className="min-h-screen bg-bg">
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <div className="flex-1 md:ml-64">
            <Header />
            <main className="p-4 md:p-6 pb-24 md:pb-6">
              <div className="max-w-6xl mx-auto">
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'habits' && <HabitManager />}
                {activeView === 'settings' && <Settings />}
              </div>
            </main>
            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
              <div className="grid grid-cols-3">
                <button onClick={() => setActiveView('dashboard')} className={`py-3 text-sm ${activeView==='dashboard' ? 'text-primary font-semibold' : 'text-text-secondary'}`}>Dashboard</button>
                <button onClick={() => setActiveView('habits')} className={`py-3 text-sm ${activeView==='habits' ? 'text-primary font-semibold' : 'text-text-secondary'}`}>Habits</button>
                <button onClick={() => setActiveView('settings')} className={`py-3 text-sm ${activeView==='settings' ? 'text-primary font-semibold' : 'text-text-secondary'}`}>Settings</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </WellnessProvider>
  );
}

export default App;