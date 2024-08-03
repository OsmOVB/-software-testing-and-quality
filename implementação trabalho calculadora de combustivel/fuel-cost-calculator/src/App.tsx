import React, { useState, useEffect } from 'react';
import FuelForm from './components/FuelForm';
import { saveDataToMockDatabase, getDataFromMockDatabase, FormData } from './database/mockDatabase';

/**
 * Componente principal da aplicação.
 * 
 * @returns JSX.Element
 */
const App: React.FC = () => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [selectedData, setSelectedData] = useState<FormData[]>([]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

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

    if (data.fuelType === 'alcohol') {
      setSelectedData(prevList => [...prevList, data]);
      setIsFormDisabled(true);
    } else {
      setSelectedData([data]);
    }
  };

  /**
   * Manipulador para reiniciar o cálculo.
   */
  const handleReset = () => {
    setSelectedData([]);
    setFormDataList([]);
    setIsFormDisabled(false);
    saveDataToMockDatabase([]); // Limpa os dados armazenados no mockDatabase
  };

  /**
   * Calcula o custo total baseado nos dados fornecidos.
   * 
   * @param {FormData} data Dados fornecidos pelo usuário.
   * @returns {string} Custo total formatado.
   */
  const calculateTotalCost = (data: FormData): string => {
    const costPerKm = data.fuelPrice / data.consumption;
    const totalCost = data.distance * costPerKm;
    return totalCost.toFixed(2);
  };

  /**
   * Compara os custos entre gasolina e álcool.
   * 
   * @returns {JSX.Element | null} Card de comparação.
   */
  const compareFuelCosts = (): JSX.Element | null => {
    if (selectedData.length < 2) return null;

    const [gasolineData, alcoholData] = selectedData;
    const gasolineCost = parseFloat(calculateTotalCost(gasolineData));
    const alcoholCost = parseFloat(calculateTotalCost(alcoholData));
    const threshold = gasolineData.fuelPrice * 0.7;

    const bestFuel = alcoholData.fuelPrice < threshold ? 'Álcool' : 'Gasolina';
    const bestCost = alcoholData.fuelPrice < threshold ? alcoholCost : gasolineCost;
    const worstFuel = bestFuel === 'Álcool' ? 'Gasolina' : 'Álcool';
    const worstCost = bestFuel === 'Álcool' ? gasolineCost : alcoholCost;

    return (
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <div style={{ backgroundColor: '#4caf50', padding: '20px', borderRadius: '5px', width: '250px', height: '250px' }}>
          <h3>{bestFuel} é mais vantajoso!</h3>
          <p>Custo: R$ {bestCost}</p>
        </div>
        <div style={{ backgroundColor: '#f44336', padding: '20px', borderRadius: '5px', width: '250px' }}>
          <h3>{worstFuel}</h3>
          <p>Custo: R$ {worstCost}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Calculadora de Gasto de Combustível</h1>
      <FuelForm onAdd={handleFormAdd} initialFuelType="gasoline" disabled={isFormDisabled} />
      <h2>Lista de Dados Adicionados</h2>
      <ul>
        {formDataList.map((data, index) => (
          <li key={index}>
            {data.distance} km, {data.consumption} km/l, {data.fuelType}, R$ {data.fuelPrice}/litro - Custo: R$ {calculateTotalCost(data)}
          </li>
        ))}
      </ul>
      {compareFuelCosts()}
      {isFormDisabled && (
        <button onClick={handleReset} style={{ marginTop: '20px' }}>
          Novo Cálculo
        </button>
      )}
    </div>
  );
};

export default App;
