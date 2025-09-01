import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const ProgressChart = () => {
  const { getWeeklyData } = useWellness();
  const weeklyData = getWeeklyData();
  const maxCount = Math.max(...weeklyData.map(d => d.count), 1);

  return (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Weekly Progress</h2>
          <p className="text-text-secondary text-sm">Habit completions over the last 7 days</p>
        </div>
        <BarChart3 className="w-5 h-5 text-text-secondary" />
      </div>
      
      <div className="flex items-end justify-between space-x-2 h-48">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="flex-1 flex items-end w-full">
              <div
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${(day.count / maxCount) * 100}%`,
                  minHeight: day.count > 0 ? '8px' : '2px'
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-semibold text-text-primary">
                {day.count}
              </div>
              <div className="text-xs text-text-secondary">
                {day.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};