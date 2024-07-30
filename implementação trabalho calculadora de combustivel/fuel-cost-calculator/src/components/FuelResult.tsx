import React from 'react';

interface FuelResultProps {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
}

const FuelResult: React.FC<FuelResultProps> = ({ distance, consumption, fuelType, fuelPrice }) => {
  // Calcular o custo por quilômetro
  const costPerKm = (fuelPrice / consumption).toFixed(2);
  // Calcular o custo total
  const totalCost = (distance * parseFloat(costPerKm)).toFixed(2);

  return (
    <div>
      <h2>Resultado</h2>
      <p>
        Para percorrer {distance} km com um veículo que consome {consumption} km/l utilizando {fuelType === 'gasoline' ? 'gasolina' : 'álcool'}, o custo será R$ {totalCost}.
      </p>
    </div>
  );
};

export default FuelResult;
