import React from 'react';
import { CategoryTotal } from '../types';
import { Leaf } from 'lucide-react';

interface ResultsProps {
  emissions: CategoryTotal[];
}

export const Results: React.FC<ResultsProps> = ({ emissions }) => {
  const totalEmissions = emissions.reduce((acc, curr) => acc + curr.amount, 0);
  const getRecommendations = (total: number) => {
    if (total > 10) {
      return [
        "Consider using public transportation or carpooling",
        "Switch to energy-efficient appliances",
        "Reduce meat consumption",
        "Implement a strict recycling routine"
      ];
    } else if (total > 5) {
      return [
        "Try walking or cycling for short distances",
        "Use natural lighting when possible",
        "Consider a more plant-based diet",
        "Start composting food waste"
      ];
    } else {
      return [
        "Great job! Keep up your eco-friendly habits",
        "Share your sustainable practices with others",
        "Look for new ways to reduce waste",
        "Consider growing your own vegetables"
      ];
    }
  };

  const getEmissionLevel = (total: number) => {
    if (total > 10) return { text: 'High Impact', color: 'text-red-600' };
    if (total > 5) return { text: 'Moderate Impact', color: 'text-yellow-600' };
    return { text: 'Low Impact', color: 'text-green-600' };
  };

  const level = getEmissionLevel(totalEmissions);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Carbon Footprint</h2>
        <Leaf className="w-8 h-8 text-green-600" />
      </div>

      <div className="mb-8">
        <div className="text-center mb-4">
          <span className="text-4xl font-bold block mb-2">{totalEmissions.toFixed(2)}</span>
          <span className="text-gray-600">kg CO2 per day</span>
        </div>
        <div className={`text-center text-lg font-semibold ${level.color}`}>
          {level.text}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {emissions.map((item) => (
          <div key={item.category} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">{item.category}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-600">kg CO2/day</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
        <ul className="space-y-2">
          {getRecommendations(totalEmissions).map((rec, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};