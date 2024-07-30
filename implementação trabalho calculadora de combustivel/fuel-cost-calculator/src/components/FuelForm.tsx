import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FuelFormInputs {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
}

interface FuelFormProps {
  onSubmit: (data: FuelFormInputs) => void;
}

const FuelForm: React.FC<FuelFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FuelFormInputs>();

  const submitHandler: SubmitHandler<FuelFormInputs> = data => {
    onSubmit(data);
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
        <label>Consumo (litros/km):</label>
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
      <button type="submit">Calcular</button>
    </form>
  );
};

export default FuelForm;
