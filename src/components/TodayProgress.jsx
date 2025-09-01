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
    <div className="bg-surface rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Today's Focus</h2>
        <Calendar className="w-5 h-5 text-text-secondary" />
      </div>
      
      <div className="text-center mb-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgb(229 231 235)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="hsl(170 70% 45%)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-text-secondary">Complete</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {habits.slice(0, 3).map((habit) => {
          const stats = getHabitStats(habit.id);
          const isCompleted = stats.todayCount > 0;
          
          return (
            <div key={habit.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  isCompleted ? 'bg-accent' : 'bg-gray-300'
                }`} />
                <span className="text-sm text-text-primary">{habit.name}</span>
              </div>
              <span className="text-xs text-text-secondary">
                {isCompleted ? 'Done' : 'Pending'}
              </span>
            </div>
          );
        })}
        
        {habits.length > 3 && (
          <div className="text-center pt-2">
            <span className="text-xs text-text-secondary">
              +{habits.length - 3} more habits
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-accent">
          <Target className="w-4 h-4" />
          <span className="text-sm font-medium">
            Keep going! You're doing great 🎯
          </span>
        </div>
      </div>
    </div>
  );
};