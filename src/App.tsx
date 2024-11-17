import React, { useState } from 'react';
import { InputSection } from './components/InputSection';
import { Results } from './components/Results';
import { ActivityData, CategoryTotal } from './types';
import { calculateTotalEmissions } from './utils/calculations';

const initialData: ActivityData = {
  transportation: { vehicleType: 'car', distance: 0 },
  energy: { electricity: 0, heating: 0 },
  food: { dietType: 'meatDiet', wasteFrequency: 'mediumWaste' },
  waste: { recycling: 'sometimes', wasteAmount: 0 },
};

function App() {
  const [data, setData] = useState<ActivityData>(initialData);
  const [emissions, setEmissions] = useState<CategoryTotal[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const results = calculateTotalEmissions(data);
    setEmissions(results);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Measure your environmental impact and discover ways to reduce it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <InputSection title="Transportation" icon="transport">
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-md"
                  value={data.transportation.vehicleType}
                  onChange={(e) =>
                    setData({
                      ...data,
                      transportation: { ...data.transportation, vehicleType: e.target.value },
                    })
                  }
                >
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="bike">Bicycle</option>
                  <option value="walk">Walking</option>
                </select>
                <input
                  type="number"
                  placeholder="Daily distance (km)"
                  className="w-full p-2 border rounded-md"
                  value={data.transportation.distance}
                  onChange={(e) =>
                    setData({
                      ...data,
                      transportation: {
                        ...data.transportation,
                        distance: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </InputSection>

            <InputSection title="Energy Usage" icon="energy">
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Daily electricity usage (kWh)"
                  className="w-full p-2 border rounded-md"
                  value={data.energy.electricity}
                  onChange={(e) =>
                    setData({
                      ...data,
                      energy: { ...data.energy, electricity: Number(e.target.value) },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Daily heating usage (kWh)"
                  className="w-full p-2 border rounded-md"
                  value={data.energy.heating}
                  onChange={(e) =>
                    setData({
                      ...data,
                      energy: { ...data.energy, heating: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </InputSection>
          </div>

          <div className="space-y-6">
            <InputSection title="Food Habits" icon="food">
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-md"
                  value={data.food.dietType}
                  onChange={(e) =>
                    setData({
                      ...data,
                      food: { ...data.food, dietType: e.target.value },
                    })
                  }
                >
                  <option value="meatDiet">Meat-based diet</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
                <select
                  className="w-full p-2 border rounded-md"
                  value={data.food.wasteFrequency}
                  onChange={(e) =>
                    setData({
                      ...data,
                      food: { ...data.food, wasteFrequency: e.target.value },
                    })
                  }
                >
                  <option value="highWaste">High food waste</option>
                  <option value="mediumWaste">Medium food waste</option>
                  <option value="lowWaste">Low food waste</option>
                </select>
              </div>
            </InputSection>

            <InputSection title="Waste Management" icon="waste">
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded-md"
                  value={data.waste.recycling}
                  onChange={(e) =>
                    setData({
                      ...data,
                      waste: { ...data.waste, recycling: e.target.value },
                    })
                  }
                >
                  <option value="always">Always recycle</option>
                  <option value="sometimes">Sometimes recycle</option>
                  <option value="never">Never recycle</option>
                </select>
                <input
                  type="number"
                  placeholder="Daily waste (kg)"
                  className="w-full p-2 border rounded-md"
                  value={data.waste.wasteAmount}
                  onChange={(e) =>
                    setData({
                      ...data,
                      waste: { ...data.waste, wasteAmount: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </InputSection>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleCalculate}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Calculate My Footprint
          </button>
        </div>

        {showResults && (
          <div className="mt-12">
            <Results emissions={emissions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;