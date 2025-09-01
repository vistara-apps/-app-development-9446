import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Clock, Bell } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export const HabitManager = () => {
  const { habits, addHabit, updateHabit, deleteHabit } = useWellness();
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const handleSubmit = (habitData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } else {
      addHabit(habitData);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Manage Habits</h1>
          <p className="text-text-secondary mt-1">Create and customize your daily wellness routines</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Habit</span>
        </button>
      </div>

      {showForm && (
        <HabitForm
          habit={editingHabit}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingHabit(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onEdit={(habit) => {
              setEditingHabit(habit);
              setShowForm(true);
            }}
            onDelete={(habitId) => deleteHabit(habitId)}
          />
        ))}
      </div>
    </div>
  );
};

const HabitForm = ({ habit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: habit?.name || '',
    description: habit?.description || '',
    icon: habit?.icon || '💧',
    reminderSettings: {
      frequency: habit?.reminderSettings?.frequency || 120,
      enabled: habit?.reminderSettings?.enabled ?? true,
      startTime: habit?.reminderSettings?.startTime || '09:00',
      endTime: habit?.reminderSettings?.endTime || '22:00'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const icons = ['💧', '🧘', '🚶', '📚', '🥗', '😴', '🏃', '🧘‍♀️', '🌱', '🎯'];

  return (
    <div className="bg-surface rounded-lg shadow-card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        {habit ? 'Edit Habit' : 'Create New Habit'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Habit Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="e.g., Drink Water"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Brief description of this habit"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Icon
          </label>
          <div className="grid grid-cols-5 gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, icon }))}
                className={`p-3 text-2xl border rounded-lg hover:bg-gray-50 transition-colors ${
                  formData.icon === icon ? 'border-primary bg-primary/10' : 'border-gray-300'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Reminder Frequency (minutes)
            </label>
            <input
              type="number"
              value={formData.reminderSettings.frequency}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                reminderSettings: {
                  ...prev.reminderSettings,
                  frequency: parseInt(e.target.value)
                }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              min="5"
              max="1440"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 mt-8">
              <input
                type="checkbox"
                checked={formData.reminderSettings.enabled}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reminderSettings: {
                    ...prev.reminderSettings,
                    enabled: e.target.checked
                  }
                }))}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
              />
              <span className="text-sm text-text-primary">Enable reminders</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={formData.reminderSettings.startTime}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                reminderSettings: {
                  ...prev.reminderSettings,
                  startTime: e.target.value
                }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              End Time
            </label>
            <input
              type="time"
              value={formData.reminderSettings.endTime}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                reminderSettings: {
                  ...prev.reminderSettings,
                  endTime: e.target.value
                }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {habit ? 'Update Habit' : 'Create Habit'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-text-primary py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const HabitCard = ({ habit, onEdit, onDelete }) => {
  const { getHabitStats } = useWellness();
  const stats = getHabitStats(habit.id);

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{habit.icon}</span>
          <div>
            <h3 className="font-semibold text-text-primary">{habit.name}</h3>
            <p className="text-text-secondary text-sm">{habit.description}</p>
          </div>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(habit)}
            className="p-2 text-text-secondary hover:text-primary transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 text-text-secondary hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Current Streak</span>
          <span className="font-semibold text-accent">{stats.streak} days</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total Completions</span>
          <span className="font-semibold text-text-primary">{stats.totalLogs}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>Every {habit.reminderSettings.frequency} min</span>
          {habit.reminderSettings.enabled && (
            <Bell className="w-4 h-4 text-accent" />
          )}
        </div>

        <div className="text-xs text-text-secondary">
          Active: {habit.reminderSettings.startTime} - {habit.reminderSettings.endTime}
        </div>
      </div>
    </div>
  );
};