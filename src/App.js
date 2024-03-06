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

  const fridgeItems = items.filter((item) => item.category === "fridge");
  const spicesItems = items.filter((item) => item.category === "spices");
  const chemistryItems = items.filter((item) => item.category === "chemistry");

  return (
    <div>
      <AddItemForm onSubmit={handleAddItem} />

      <ItemList
        category="Lodówka"
        items={fridgeItems}
        onRemove={handleRemoveItem}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        isLoading={isLoading}
        isError={isError}
      />
      <ItemList
        category="Przyprawy"
        items={spicesItems}
        onRemove={handleRemoveItem}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        isLoading={isLoading}
        isError={isError}
      />
      <ItemList
        category="Chemia"
        items={chemistryItems}
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
