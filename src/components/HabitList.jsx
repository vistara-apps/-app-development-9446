import React from 'react';
import { Plus, Check, Clock, Settings } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { format, isToday } from 'date-fns';

export const HabitList = () => {
  const { habits, logHabit, getHabitStats } = useWellness();

  const handleComplete = (habitId) => {
    logHabit(habitId);
  };

  return (
    <div className="bg-surface rounded-lg shadow-card">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Today's Habits</h2>
          <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {habits.map((habit) => {
            const stats = getHabitStats(habit.id);
            const isCompletedToday = stats.todayCount > 0;
            
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleComplete(habit.id)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isCompletedToday
                        ? 'bg-accent text-white'
                        : 'border-2 border-gray-300 hover:border-accent text-gray-400 hover:text-accent'
                    }`}
                  >
                    {isCompletedToday ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-2xl">{habit.icon}</span>
                    )}
                  </button>
                  
                  <div>
                    <h3 className="font-semibold text-text-primary">{habit.name}</h3>
                    <p className="text-text-secondary text-sm">{habit.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-text-secondary flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Every {habit.reminderSettings.frequency} min
                      </span>
                      <span className="text-xs text-accent font-medium">
                        {stats.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isCompletedToday && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      Completed today
                    </span>
                  )}
                  <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
          
          {habits.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                No habits yet
              </h3>
              <p className="text-text-secondary mb-4">
                Create your first habit to start tracking your wellness journey
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Create Your First Habit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};