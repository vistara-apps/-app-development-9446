import React from 'react';
import { StatsCards } from './StatsCards';
import { HabitList } from './HabitList';
import { ProgressChart } from './ProgressChart';
import { TodayProgress } from './TodayProgress';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>
        <div>
          <TodayProgress />
        </div>
      </div>
      
      <HabitList />
    </div>
  );
};