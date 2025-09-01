import React from 'react';
import { Plus, Check, Clock, Settings, Target } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { format, isToday } from 'date-fns';

export const HabitList = () => {
  const { habits, logHabit, getHabitStats } = useWellness();

  const handleComplete = (habitId) => {
    logHabit(habitId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="p-5 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Today's Habits</h2>
          <button className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
            <Plus className="w-5 h-5" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>
      
      <div className="p-5 md:p-6">
        <div className="space-y-4">
          {habits.map((habit) => {
            const stats = getHabitStats(habit.id);
            const isCompletedToday = stats.todayCount > 0;
            
            return (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 transition-colors bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleComplete(habit.id)}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors ${
                      isCompletedToday
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'border-2 border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-400 bg-white'
                    }`}
                  >
                    {isCompletedToday ? (
                      <Check className="w-7 h-7 md:w-8 md:h-8" />
                    ) : (
                      <span className="text-2xl md:text-3xl">{habit.icon}</span>
                    )}
                  </button>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{habit.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base mb-2">{habit.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Every {habit.reminderSettings.frequency} min
                      </span>
                      <span className="text-blue-600 text-sm font-semibold">
                        {stats.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isCompletedToday && (
                    <span className="hidden md:inline bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Completed today
                    </span>
                  )}
                  <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
          
          {habits.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No habits yet
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Create your first habit to start tracking your wellness journey
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg">
                Create Your First Habit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};