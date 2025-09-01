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
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <div className="flex-1 md:ml-64">
            <Header />
            <main className="p-4 md:p-6 pb-28 md:pb-6">
              <div className="max-w-6xl mx-auto">
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'habits' && <HabitManager />}
                {activeView === 'settings' && <Settings />}
              </div>
            </main>
            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg [padding-bottom:env(safe-area-inset-bottom)]">
              <div className="grid grid-cols-3">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`py-4 flex flex-col items-center gap-1 transition-colors ${
                    activeView === 'dashboard' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="text-2xl">🏠</div>
                  <span className="text-xs font-semibold">Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveView('habits')}
                  className={`py-4 flex flex-col items-center gap-1 transition-colors ${
                    activeView === 'habits' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="text-2xl">✅</div>
                  <span className="text-xs font-semibold">Habits</span>
                </button>
                <button
                  onClick={() => setActiveView('settings')}
                  className={`py-4 flex flex-col items-center gap-1 transition-colors ${
                    activeView === 'settings' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="text-2xl">⚙️</div>
                  <span className="text-xs font-semibold">Settings</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </WellnessProvider>
  );
}

export default App;