import React from 'react';
import { Car, Zap, Utensils, Trash2 } from 'lucide-react';

interface InputSectionProps {
  title: string;
  icon: 'transport' | 'energy' | 'food' | 'waste';
  children: React.ReactNode;
}

export const InputSection: React.FC<InputSectionProps> = ({ title, icon, children }) => {
  const icons = {
    transport: Car,
    energy: Zap,
    food: Utensils,
    waste: Trash2,
  };

  const Icon = icons[icon];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-green-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};