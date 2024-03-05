import React, { useState, useCallback } from "react";
import Input from "./Input";

const AddItemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", quantity: "" });

  const handleInputChange = useCallback((e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const adjustedQuantity =
        formData.quantity > 0 && formData.quantity < 1
          ? 1
          : parseFloat(formData.quantity);
      onSubmit(formData.name, adjustedQuantity);
      setFormData({ name: "", quantity: "" });
    },
    [formData, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-blue-400 flex items-center">
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
      <button
        className="p-2 rounded-md bg-green-300 text-[15px]"
        type="submit"
      >
        <span className="hidden md:inline-block"> Dodaj do lodówki</span>
        <span className="md:hidden inline-block"> Dodaj</span>
      </button>
    </form>
  );
};

export default AddItemForm;
