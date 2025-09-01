import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Settings, 
  BarChart3, 
  Calendar,
  Star
} from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'habits', name: 'My Habits', icon: Target },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, pro: true },
  { id: 'calendar', name: 'Calendar', icon: Calendar, pro: true },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar = ({ activeView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-text-primary">
            Wellness Tracker
          </span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  )}
                  disabled={item.pro && true} // In real app, check user.isPro
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.pro && (
                    <Star className="w-4 h-4 text-accent ml-auto" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
          <p className="text-sm opacity-90 mb-3">
            Advanced customization & analytics
          </p>
          <button className="w-full bg-white text-primary rounded-lg py-2 text-sm font-semibold hover:bg-gray-50 transition-colors">
            Try 14 days free
          </button>
        </div>
      </div>
    </aside>
  );
};