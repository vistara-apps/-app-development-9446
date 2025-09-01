import React from 'react';
import { Calendar, Target } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const TodayProgress = () => {
  const { getTodayStats, habits, getHabitStats } = useWellness();
  const todayStats = getTodayStats();
  const progress = todayStats.completionRate;

  // Calculate the circumference and stroke offset for the circular progress
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Today's Focus</h2>
        <div className="bg-blue-100 p-3 rounded-xl">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 md:w-36 md:h-36 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#10b981"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {Math.round(progress)}%
              </div>
              <div className="text-gray-600 text-sm font-medium">Complete</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {habits.slice(0, 3).map((habit) => {
          const stats = getHabitStats(habit.id);
          const isCompleted = stats.todayCount > 0;
          
          return (
            <div key={habit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-gray-900 font-medium">{habit.name}</span>
              </div>
              <span className={`text-sm font-semibold ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                {isCompleted ? 'Done' : 'Pending'}
              </span>
            </div>
          );
        })}
        
        {habits.length > 3 && (
          <div className="text-center pt-2">
            <span className="text-gray-500 text-sm font-medium">
              +{habits.length - 3} more habits
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-green-600">
          <Target className="w-5 h-5" />
          <span className="font-semibold text-sm">
            Keep going! You're doing great 🎯
          </span>
        </div>
      </div>
    </div>
  );
};