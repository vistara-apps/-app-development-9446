import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const ProgressChart = () => {
  const { getWeeklyData } = useWellness();
  const weeklyData = getWeeklyData();
  const maxCount = Math.max(...weeklyData.map(d => d.count), 1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Weekly Progress</h2>
          <p className="text-gray-600 text-sm">Habit completions over the last 7 days</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-xl">
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-48 md:h-52">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="flex-1 flex items-end w-full">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-300 hover:opacity-80 min-h-[4px]"
                style={{
                  height: `${Math.max((day.count / maxCount) * 100, 8)}%`
                }}
              />
            </div>
            <div className="mt-3 text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">
                {day.count}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {day.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};