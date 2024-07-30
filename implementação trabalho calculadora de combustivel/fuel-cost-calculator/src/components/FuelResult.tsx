import React from 'react';

interface FuelResultProps {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
}

const FuelResult: React.FC<FuelResultProps> = ({ distance, consumption, fuelType, fuelPrice }) => {
  const totalCost = (distance * consumption * fuelPrice).toFixed(2);

  return (
    <div>
      <h2>Resultado</h2>
      <p>
        Para percorrer {distance} km com um veículo que consome {consumption} litros/km utilizando {fuelType === 'gasoline' ? 'gasolina' : 'álcool'}, o custo será R$ {totalCost}.
      </p>
    </div>
  );
};

export default FuelResult;
