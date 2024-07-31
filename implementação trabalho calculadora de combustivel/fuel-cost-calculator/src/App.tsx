import React, { useState, useEffect } from 'react';
import FuelForm from './components/FuelForm';
import FuelResult from './components/FuelResult';
import { saveDataToMockDatabase, getDataFromMockDatabase } from './database/mockDatabase';

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
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [selectedData, setSelectedData] = useState<FormData | null>(null);

  // Carrega os dados iniciais do mockDatabase
  useEffect(() => {
    const initialData = getDataFromMockDatabase();
    setFormDataList(initialData);
  }, []);

  /**
   * Manipulador para adicionar dados à lista.
   * 
   * @param {FormData} data Dados fornecidos pelo usuário.
   */
  const handleFormAdd = (data: FormData) => {
    setFormDataList(prevList => {
      const updatedList = [...prevList, data];
      saveDataToMockDatabase(updatedList);
      return updatedList;
    });
  };

  /**
   * Manipulador para selecionar dados da lista.
   * 
   * @param {FormData} data Dados fornecidos pelo usuário.
   */
  const handleSelectData = (data: FormData) => {
    setSelectedData(data);
  };

  return (
    <div>
      <h1>Calculadora de Gasto de Combustível</h1>
      <FuelForm onAdd={handleFormAdd} />
      <h2>Lista de Dados Adicionados</h2>
      <ul>
        {formDataList.map((data, index) => (
          <li key={index} onClick={() => handleSelectData(data)}>
            {data.distance} km, {data.consumption} km/l, {data.fuelType}, R$ {data.fuelPrice}/litro
          </li>
        ))}
      </ul>
      {selectedData && (
        <FuelResult
          distance={selectedData.distance}
          consumption={selectedData.consumption}
          fuelType={selectedData.fuelType}
          fuelPrice={selectedData.fuelPrice}
        />
      )}
    </div>
  );
};

export default App;
