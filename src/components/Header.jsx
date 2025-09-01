import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const Header = () => {
  const { user, getTodayStats } = useWellness();
  const stats = getTodayStats();

  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Good morning, {user.name}! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            You've completed {stats.completedToday} out of {stats.totalHabits} habits today
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
            <input
              type="text"
              placeholder="Search habits..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            {user.isPro && (
              <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                PRO
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};