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
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Current Streak',
      value: totalStreak,
      subtitle: 'days strong',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Total Habits',
      value: habits.length,
      subtitle: 'active habits',
      icon: Trophy,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Time Saved',
      value: '2.3h',
      subtitle: 'this week',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={index}
            className="bg-surface rounded-lg p-6 shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  {stat.subtitle}
                </p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};