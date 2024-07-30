import React, { useState } from 'react';
import FuelForm from './components/FuelForm';
import FuelResult from './components/FuelResult';

const App: React.FC = () => {
  const [formData, setFormData] = useState<null | {
    distance: number;
    consumption: number;
    fuelType: 'gasoline' | 'alcohol' | 'diesel';
    fuelPrice: number;
  }>(null);

  const handleFormSubmit = (data: {
    distance: number;
    consumption: number;
    fuelType: 'gasoline' | 'alcohol' | 'diesel';
    fuelPrice: number;
  }) => {
    setFormData(data);
  };

  return (
    <div>
      <h1>Calculadora de Gasto de Combustível</h1>
      <FuelForm onSubmit={handleFormSubmit} />
      {formData && (
        <FuelResult
          distance={formData.distance}
          consumption={formData.consumption}
          fuelType={formData.fuelType}
          fuelPrice={formData.fuelPrice}
        />
      )}
    </div>
  );
};

export default App;
