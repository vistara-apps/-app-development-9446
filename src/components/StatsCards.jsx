import React from 'react';
import { Target, Flame, Trophy, Clock } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const StatsCards = () => {
  const { getTodayStats, habits, getHabitStats } = useWellness();
  const todayStats = getTodayStats();
  
  const totalStreak = habits.reduce((sum, habit) => {
    const stats = getHabitStats(habit.id);
    return sum + stats.streak;
  }, 0);

  const stats = [
    {
      title: 'Today\'s Progress',
      value: `${todayStats.completedToday}/${todayStats.totalHabits}`,
      subtitle: `${Math.round(todayStats.completionRate)}% complete`,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Current Streak',
      value: totalStreak,
      subtitle: 'days strong',
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Total Habits',
      value: habits.length,
      subtitle: 'active habits',
      icon: Trophy,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Time Saved',
      value: '2.3h',
      subtitle: 'this week',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col gap-3">
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl w-fit`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};