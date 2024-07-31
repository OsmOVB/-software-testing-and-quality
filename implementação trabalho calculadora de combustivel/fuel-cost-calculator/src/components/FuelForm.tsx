import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

/**
 * Tipos de entrada para o formulário de combustível.
 */
interface FuelFormInputs {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol' | 'diesel';
  fuelPrice: number;
}

/**
 * Propriedades do componente FuelForm.
 */
interface FuelFormProps {
  onAdd: (data: FuelFormInputs) => void;
}

/**
 * Componente FuelForm
 * 
 * Formulário para entrada de dados relacionados ao cálculo do custo de combustível.
 * 
 * @param {FuelFormProps} props Propriedades do componente.
 * @returns JSX.Element
 */
const FuelForm: React.FC<FuelFormProps> = ({ onAdd }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FuelFormInputs>();

  const submitHandler: SubmitHandler<FuelFormInputs> = data => {
    onAdd(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Distância (km):</label>
        <input
          {...register('distance', { required: true, min: 1 })}
          type="number"
          step="any"
        />
        {errors.distance && <span>Insira uma distância válida.</span>}
      </div>
      <div>
        <label>Consumo (km/l):</label>
        <input
          {...register('consumption', { required: true, min: 0.01 })}
          type="number"
          step="any"
        />
        {errors.consumption && <span>Insira um consumo válido.</span>}
      </div>
      <div>
        <label>Tipo de Combustível:</label>
        <select {...register('fuelType', { required: true })}>
          <option value="gasoline">Gasolina</option>
          <option value="alcohol">Álcool</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>
      <div>
        <label>Preço do Combustível (R$/litro):</label>
        <input
          {...register('fuelPrice', { required: true, min: 0.01 })}
          type="number"
          step="any"
        />
        {errors.fuelPrice && <span>Insira um preço válido.</span>}
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FuelForm;
