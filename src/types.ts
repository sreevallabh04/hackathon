export interface ActivityData {
  transportation: {
    vehicleType: string;
    distance: number;
  };
  energy: {
    electricity: number;
    heating: number;
  };
  food: {
    dietType: string;
    wasteFrequency: string;
  };
  waste: {
    recycling: string;
    wasteAmount: number;
  };
}

export interface EmissionFactors {
  [key: string]: number;
}

export interface CategoryTotal {
  category: string;
  amount: number;
}