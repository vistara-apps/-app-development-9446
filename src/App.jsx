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
          <div className="flex-1 ml-64">
            <Header />
            <main className="p-6">
              <div className="max-w-6xl mx-auto">
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'habits' && <HabitManager />}
                {activeView === 'settings' && <Settings />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </WellnessProvider>
  );
}

export default App;