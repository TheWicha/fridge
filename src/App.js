import React, { useState, useEffect } from "react";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import useFridgeItemsManager from "./hooks/useFridgeItemsManager";

const Home = () => {
  const {
    items,
    isLoading,
    isError,
    error,
    handleAddItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useFridgeItemsManager();

  return (
    <div>
      <AddItemForm onSubmit={handleAddItem} />
      <p className="px-4 py-2  bg-slate-200">
        <span>Produkty w lodówce:</span>
      </p>
      <ItemList
        items={items}
        onRemove={handleRemoveItem}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Home;
