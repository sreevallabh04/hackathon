import { ActivityData, EmissionFactors, CategoryTotal } from '../types';

const EMISSION_FACTORS: EmissionFactors = {
  car: 0.2, // kg CO2 per km
  bus: 0.08,
  bike: 0,
  walk: 0,
  electricity: 0.5, // kg CO2 per kWh
  heating: 0.2,
  meatDiet: 2.5, // kg CO2 per day
  vegetarian: 1.3,
  vegan: 1.0,
  highWaste: 1.5, // kg CO2 per day
  mediumWaste: 1.0,
  lowWaste: 0.5,
};

export const calculateTransportationEmissions = (type: string, distance: number): number => {
  return (EMISSION_FACTORS[type] || 0) * distance;
};

export const calculateEnergyEmissions = (electricity: number, heating: number): number => {
  return (electricity * EMISSION_FACTORS.electricity) + (heating * EMISSION_FACTORS.heating);
};

export const calculateFoodEmissions = (dietType: string, wasteFrequency: string): number => {
  const dietEmission = EMISSION_FACTORS[dietType] || EMISSION_FACTORS.meatDiet;
  const wasteEmission = EMISSION_FACTORS[wasteFrequency] || EMISSION_FACTORS.mediumWaste;
  return dietEmission + wasteEmission;
};

export const calculateWasteEmissions = (recycling: string, amount: number): number => {
  const recyclingFactor = recycling === 'always' ? 0.5 : recycling === 'sometimes' ? 0.8 : 1;
  return amount * recyclingFactor;
};

export const calculateTotalEmissions = (data: ActivityData): CategoryTotal[] => {
  const transportation = calculateTransportationEmissions(data.transportation.vehicleType, data.transportation.distance);
  const energy = calculateEnergyEmissions(data.energy.electricity, data.energy.heating);
  const food = calculateFoodEmissions(data.food.dietType, data.food.wasteFrequency);
  const waste = calculateWasteEmissions(data.waste.recycling, data.waste.wasteAmount);

  return [
    { category: 'Transportation', amount: transportation },
    { category: 'Energy', amount: energy },
    { category: 'Food', amount: food },
    { category: 'Waste', amount: waste },
  ];
};