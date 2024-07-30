import React, { useState } from 'react';
import FuelForm from './components/FuelForm';
import FuelResult from './components/FuelResult';

/**
 * Tipos de dados do formulário.
 */
interface FormData {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol' | 'diesel';
  fuelPrice: number;
}

/**
 * Componente principal da aplicação.
 * 
 * @returns JSX.Element
 */
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  /**
   * Manipulador para envio do formulário.
   * 
   * @param {FormData} data Dados fornecidos pelo usuário.
   */
  const handleFormSubmit = (data: FormData) => {
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
