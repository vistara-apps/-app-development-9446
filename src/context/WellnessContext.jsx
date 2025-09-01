import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, isToday, startOfDay, endOfDay } from 'date-fns';

const WellnessContext = createContext();

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};

const DEFAULT_HABITS = [
  {
    id: '1',
    name: 'Drink Water',
    description: 'Stay hydrated throughout the day',
    icon: '💧',
    reminderSettings: {
      frequency: 120, // minutes
      enabled: true,
      startTime: '09:00',
      endTime: '22:00'
    },
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Take a Break',
    description: 'Stand up and stretch every hour',
    icon: '🧘',
    reminderSettings: {
      frequency: 60, // minutes
      enabled: true,
      startTime: '09:00',
      endTime: '18:00'
    },
    createdAt: new Date().toISOString()
  }
];

export const WellnessProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [habitLogs, setHabitLogs] = useState([]);
  const [user, setUser] = useState({ id: '1', name: 'User', isPro: false });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('wellness-habits');
    const savedLogs = localStorage.getItem('wellness-logs');
    
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      setHabits(DEFAULT_HABITS);
    }
    
    if (savedLogs) {
      setHabitLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('wellness-habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('wellness-logs', JSON.stringify(habitLogs));
  }, [habitLogs]);

  const addHabit = (habitData) => {
    const newHabit = {
      id: Date.now().toString(),
      ...habitData,
      createdAt: new Date().toISOString()
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (habitId, updates) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    setHabitLogs(prev => prev.filter(log => log.habitId !== habitId));
  };

  const logHabit = (habitId, notes = '') => {
    const newLog = {
      id: Date.now().toString(),
      habitId,
      completedAt: new Date().toISOString(),
      notes
    };
    setHabitLogs(prev => [...prev, newLog]);
  };

  const getHabitStats = (habitId) => {
    const logs = habitLogs.filter(log => log.habitId === habitId);
    const todayLogs = logs.filter(log => isToday(new Date(log.completedAt)));
    
    // Calculate streak
    let streak = 0;
    const sortedLogs = logs.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    
    if (sortedLogs.length > 0) {
      let currentDate = new Date();
      let dayOffset = 0;
      
      while (dayOffset < 30) { // Check last 30 days
        const checkDate = new Date(currentDate);
        checkDate.setDate(checkDate.getDate() - dayOffset);
        
        const hasLogForDay = sortedLogs.some(log => 
          isToday(new Date(log.completedAt)) && 
          new Date(log.completedAt).toDateString() === checkDate.toDateString()
        );
        
        if (hasLogForDay) {
          streak++;
          dayOffset++;
        } else {
          break;
        }
      }
    }

    return {
      totalLogs: logs.length,
      todayCount: todayLogs.length,
      streak,
      lastCompleted: logs.length > 0 ? logs[logs.length - 1].completedAt : null
    };
  };

  const getTodayStats = () => {
    const today = new Date();
    const todayLogs = habitLogs.filter(log => isToday(new Date(log.completedAt)));
    
    return {
      totalHabits: habits.length,
      completedToday: todayLogs.length,
      completionRate: habits.length > 0 ? (todayLogs.length / habits.length) * 100 : 0
    };
  };

  const getWeeklyData = () => {
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const dayLogs = habitLogs.filter(log => {
        const logDate = new Date(log.completedAt);
        return logDate.toDateString() === date.toDateString();
      });
      
      weekData.push({
        date: format(date, 'MMM dd'),
        count: dayLogs.length
      });
    }
    return weekData;
  };

  const value = {
    user,
    habits,
    habitLogs,
    addHabit,
    updateHabit,
    deleteHabit,
    logHabit,
    getHabitStats,
    getTodayStats,
    getWeeklyData
  };

  return (
    <WellnessContext.Provider value={value}>
      {children}
    </WellnessContext.Provider>
  );
};