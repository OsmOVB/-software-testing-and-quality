import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

/**
 * Tipos de entrada para o formulário de combustível.
 */
interface FuelFormInputs {
  distance: number;
  consumption: number;
  fuelType: "gasoline" | "alcohol" | "diesel";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FuelFormInputs>();

  const submitHandler: SubmitHandler<FuelFormInputs> = (data) => {
    onAdd(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Distância (km):</label>
        <input
          {...register("distance", {
            required: "Insira uma distância válida.",
            min: { value: 0.1, message: "A distância deve ser maior que 0." },
          })}
          type="number"
          step="any"
        />
        {errors.distance && <span>{errors.distance.message}</span>}
      </div>
      <div>
        <label>Consumo (km/l):</label>
        <input
          {...register("consumption", {
            required: "Insira um consumo válido.",
            min: { value: 0.1, message: "O consumo deve ser maior que 0." },
          })}
          type="number"
          step="any"
        />
        {errors.consumption && <span>{errors.consumption.message}</span>}
      </div>
      <div>
        <label>Tipo de Combustível:</label>
        <select
          {...register("fuelType", {
            required: "Selecione um tipo de combustível.",
          })}
        >
          <option value="gasoline">Gasolina</option>
          <option value="alcohol">Álcool</option>
          <option value="diesel">Diesel</option>
        </select>
      </div>
      <div>
        <label>Preço do Combustível (R$/litro):</label>
        <input
          {...register("fuelPrice", {
            required: "Insira um preço válido.",
            min: { value: 0.01, message: "O preço deve ser maior que 0.1" },
          })}
          type="number"
          step="any"
        />
        {errors.fuelPrice && <span>{errors.fuelPrice.message}</span>}
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FuelForm;
