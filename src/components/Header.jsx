import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const Header = () => {
  const { user, getTodayStats } = useWellness();
  const stats = getTodayStats();

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-gray-100 px-4 py-4 md:px-6 md:py-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Good morning, {user.name}! 👋
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            You've completed {stats.completedToday} out of {stats.totalHabits} habits today
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search habits..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:bg-white"
            />
          </div>
          
          <button className="relative p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
          
          <button className="p-3 bg-primary rounded-xl hover:bg-primary/90 transition-colors">
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};