import React, { useState, useCallback } from "react";
import Input from "./Input";
import Toast from "./Toast";
import { toast } from "react-toastify";

const AddItemForm = ({ onSubmit }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
  });

  const handleInputChange = useCallback((e) => {
    const selectedValue = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: selectedValue,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const adjustedQuantity =
        formData.quantity > 0 && formData.quantity < 1
          ? 1
          : parseFloat(formData.quantity);
      onSubmit(formData.name, adjustedQuantity, formData.category);
      const errorItem = await onSubmit(
        formData.name,
        adjustedQuantity,
        formData.category
      );
      setError(errorItem);
      setFormData({ name: "", quantity: "", category: formData.category });
    },
    [formData, onSubmit]
  );

  error && toast("taki produkt już istnieje!");
  console.log(error);
  return (
    <>
      <Toast />
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-blue-400 flex items-center"
      >
        <Input
          name="name"
          placeholder="Wprowadź nazwę"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          name="quantity"
          placeholder="Wprowadź ilość"
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <select
          className="p-[0.6rem] rounded-md"
          name="category"
          onChange={handleInputChange}
        >
          <option value="none">Wybierz kategorię</option>
          <option value="fridge">Lodówka</option>
          <option value="spices">Przyprawy</option>
          <option value="chemistry">Chemia</option>
        </select>
        <button
          className="p-2 ml-2 rounded-md bg-green-300 text-[15px]"
          type="submit"
        >
          <span> Dodaj </span>
        </button>
      </form>
    </>
  );
};

export default AddItemForm;
