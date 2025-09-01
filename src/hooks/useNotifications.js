import { useState, useEffect } from 'react';
import { useWellness } from '../context/WellnessContext';

export const useNotifications = () => {
  const [permission, setPermission] = useState(Notification.permission);
  const { habits } = useWellness();

  useEffect(() => {
    if (permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, [permission]);

  useEffect(() => {
    if (permission === 'granted') {
      const intervals = [];

      habits.forEach(habit => {
        if (habit.reminderSettings.enabled) {
          const intervalId = setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();
            const [startHour, startMin] = habit.reminderSettings.startTime.split(':').map(Number);
            const [endHour, endMin] = habit.reminderSettings.endTime.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;

            if (currentTime >= startTime && currentTime <= endTime) {
              new Notification(`Time for: ${habit.name}`, {
                body: habit.description,
                icon: '/wellness-icon.png'
              });
            }
          }, habit.reminderSettings.frequency * 60 * 1000);

          intervals.push(intervalId);
        }
      });

      return () => {
        intervals.forEach(clearInterval);
      };
    }
  }, [habits, permission]);

  return { permission };
};