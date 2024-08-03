import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

/**
 * Tipos de entrada para o formulário de combustível.
 */
interface FuelFormInputs {
  distance: number;
  consumption: number;
  fuelType: 'gasoline' | 'alcohol';
  fuelPrice: number;
}

/**
 * Propriedades do componente FuelForm.
 */
interface FuelFormProps {
  onAdd: (data: FuelFormInputs) => void;
  initialFuelType?: 'gasoline' | 'alcohol';
  initialDistance?: number;
  disabled?: boolean;
}

/**
 * Componente FuelForm
 * 
 * Formulário para entrada de dados relacionados ao cálculo do custo de combustível.
 * 
 * @param {FuelFormProps} props Propriedades do componente.
 * @returns JSX.Element
 */
const FuelForm: React.FC<FuelFormProps> = ({ onAdd, initialFuelType = 'gasoline', initialDistance = 0, disabled = false }) => {
  const [fuelType, setFuelType] = useState<'gasoline' | 'alcohol'>(initialFuelType);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FuelFormInputs>({
    defaultValues: {
      distance: initialDistance,
      fuelType: initialFuelType
    }
  });

  useEffect(() => {
    setFuelType(initialFuelType);
  }, [initialFuelType]);

  const submitHandler: SubmitHandler<FuelFormInputs> = data => {
    onAdd(data);
    if (data.fuelType === 'gasoline') {
      setFuelType('alcohol');
      reset({
        distance: data.distance,
        fuelType: 'alcohol'
      });
    } else {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Distância (km):</label>
        <input
          {...register('distance', { required: "Insira uma distância válida.", min: { value: 0.1, message: "A distância deve ser maior que 0." } })}
          type="number"
         // step="any"
          disabled={fuelType === 'alcohol'} // Permite a entrada de distância para novo cálculo
          
        />
        {errors.distance && <span>{errors.distance.message}</span>}
      </div>
      <div>
        <label>Consumo (km/l):</label>
        <input
          {...register('consumption', { required: "Insira um consumo válido.", min: { value: 0.1, message: "O consumo deve ser maior que 0." } })}
          type="number"
          step="any"
          disabled={disabled}
        />
        {errors.consumption && <span>{errors.consumption.message}</span>}
      </div>
      <div>
        <label>Tipo de Combustível:</label>
        <select {...register('fuelType')} disabled>
          <option value="gasoline">Gasolina</option>
          <option value="alcohol">Álcool</option>
        </select>
      </div>
      <div>
        <label>Preço do Combustível (R$/litro):</label>
        <input
          {...register('fuelPrice', { required: "Insira um preço válido.", min: { value: 0.01, message: "O preço deve ser maior que 0." } })}
          type="number"
          step="any"
          disabled={disabled}
        />
        {errors.fuelPrice && <span>{errors.fuelPrice.message}</span>}
      </div>
      <button type="submit" disabled={disabled}>Adicionar</button>
    </form>
  );
};

export default FuelForm;
